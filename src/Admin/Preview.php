<?php

namespace WPGatsby\Admin;

use GraphQLRelay\Relay;
use GraphQL\Error\UserError;
use WPGraphQL\Router;

class Preview {
	public static $last_sent_modified_time_key = '_wpgatsby_last_preview_modified_time';

	function __construct() {
    	$enable_gatsby_preview = self::get_setting('enable_gatsby_preview');

		if ($enable_gatsby_preview === 'on') {
			add_action( 'save_post', [ $this, 'post_to_preview_instance' ], 10, 2 );
			add_filter( 'template_include', [ $this, 'setup_preview_template' ], 1, 99 );

			add_action( 'graphql_register_types', function() {
				$this->registerPreviewStatusFieldsAndMutations ();
			} );
		}
	}

	public static function printInitialPreviewTemplateStateJS() {
		global $post;
		$post_id  = $post->ID;

		$preview_url  = self::get_gatsby_preview_instance_url();
		$preview_url  = rtrim( $preview_url, '/' );

		$preview_webhook_online = get_option(
			'_wp_gatsby_preview_webhook_is_online'
		);

		$initial_state = json_encode([
			'postId' =>  $post_id,
			'previewFrontendUrl' => $preview_url,
			'previewWebhookIsOnline' =>  $preview_webhook_online,
			'graphqlEndpoint' => Router::$route,
			'webhookWasCalled' => Preview::wasPreviewWebhookCalledForPostId(
				$post_id
			)
		]);

		echo "var initialState = $initial_state; console.log({ initialState: initialState });";
	}

	static function getLastSentModifiedTimeByPostId( $post_id ) {
		return get_post_meta(
			$post_id,
			self::$last_sent_modified_time_key,
			true
		);
	}

	public static function wasPreviewWebhookCalledForPostId( $post_id ) {
		$revision = self::getPreviewablePostObjectByPostId( $post_id );

		$revision_modified = $revision->post_modified ?? null;

		$last_sent_modified_time = self::getLastSentModifiedTimeByPostId(
			$post_id
		);

		return $revision_modified === $last_sent_modified_time;
	}

	static function getPreviewablePostObjectByPostId( $post_id ) {
		$revision = array_values(
			wp_get_post_revisions( $post_id )
		)[0]
			// or if revisions are disabled, get the autosave
			?? wp_get_post_autosave( $post_id, get_current_user_id() )
			// otherwise we can't preview anything
			?? null;

		if ( $revision ) {
			return $revision;
		}

		return get_post( $post_id );
	}

	function registerPreviewStatusFieldsAndMutations() {
		register_graphql_enum_type( 'WPGatsbyRemotePreviewStatusEnum', [
			'description' => __( 'The different statuses a Gatsby Preview can be in for a single node.', 'wp-gatsby' ),
			'values' => [
				'PREVIEW_SUCCESS' => [
					'value' => 'PREVIEW_SUCCESS'
				],
				'NO_PAGE_CREATED_FOR_PREVIEWED_NODE' => [
					'value' => 'NO_PAGE_CREATED_FOR_PREVIEWED_NODE'
				],
				'GATSBY_PREVIEW_PROCESS_ERROR' => [
					'value' => 'GATSBY_PREVIEW_PROCESS_ERROR'
				],
				'RECEIVED_PREVIEW_DATA_FROM_WRONG_URL' => [
					'value' => 'RECEIVED_PREVIEW_DATA_FROM_WRONG_URL'
				]
			]
		] );


		register_graphql_mutation( 'wpGatsbyRemotePreviewStatus', [
			'inputFields'         => [
				'pagePath' => [
					'type' => 'String',
					'description' => __( 'The Gatsby page path for this preview.', 'wp-gatsby' ),
				],
				'modified' => [
					'type' => 'String',
					'description' => __( 'The modified date of the latest revision for this preview.', 'wp-gatsby' ),
				],
				'parentId' => [
					'type' => 'Number',
					'description' => __( 'The previewed revisions post parent id', 'wp-gatsby' ),
				],
				'status' => [
					'type' => [ 'non_null' => 'WPGatsbyRemotePreviewStatusEnum' ],
					'description' => __( 'The remote status of the previewed node', 'wp-gatsby' ),
				],
				'statusContext' => [
					'type' => 'String',
					'description' => __( 'Additional context about the preview status', 'wp-gatsby' ),
				],
			],
			'outputFields' => [
				'success' => [
					'type' => 'Boolean',
					'description' => __( 'Wether or not the revision mutation was successful', 'wp-gatsby' ),
					'resolve' => function( $payload, $args, $context, $info ) {
						$success = $payload['success'] ?? null;

						return [
							'success' => $success
						];
					}
				]
			],
			'mutateAndGetPayload' => function( $input, $context, $info ) {
				$page_path = $input['pagePath'] ?? null;
				$modified = $input['modified'] ?? null;
				$parent_id = $input['parentId'] ?? null;
				$remote_status = $input['status'] ?? null;
				$preview_context = $input['statusContext'] ?? null;

				$post = get_post( $parent_id );

				$post_type_object = $post 
					? get_post_type_object( $post->post_type )
					: null;

				$user_can_edit_this_post = $post
					? current_user_can(
						$post_type_object->cap->edit_posts,
						$parent_id
					) 
					: null;

				if ( !$post || !$user_can_edit_this_post ) {
					throw new UserError(
						sprintf(
							__(
								'Sorry, you are not allowed to update post %1$s',
								'wp-gatsby'
							),
							$parent_id,
						)
					);
				}

				if ( $page_path ) {
					update_post_meta(
						$parent_id,
						'_wpgatsby_page_path',
						$page_path
					);
				}

				if ( $modified ) {
					update_post_meta(
						$parent_id,
						'_wpgatsby_node_modified',
						$modified
					);
				}
				
				if ( $remote_status ) {
					update_post_meta(
						$parent_id,
						'_wpgatsby_node_remote_preview_status',
						$remote_status
					);
				}
				
				if ( $preview_context ) {
					update_post_meta(
						$parent_id,
						'_wpgatsby_node_remote_preview_status_context',
						$preview_context
					);
				}

				return [
					'success' => true
				];
			}
		] );
		
		register_graphql_object_type( 'WPGatsbyPageNode', [
			'description' => __( 'A previewed Gatsby page node.' ),
			'fields'      => [
				'path' => [
					'type' => 'String'
				],
			]
		] );

		register_graphql_enum_type( 'WPGatsbyWPPreviewedNodeStatus', [
			'description' => __( 'The different statuses a Gatsby Preview can be in for a single node.', 'wp-gatsby' ),
			'values' => [
				'NO_NODE_FOUND' => [
					'value' => 'NO_NODE_FOUND'
				],
				'PREVIEW_READY' => [
					'value' => 'PREVIEW_READY'
				],
				'REMOTE_NODE_NOT_YET_UPDATED' => [
					'value' => 'REMOTE_NODE_NOT_YET_UPDATED'
				],
				'NO_PREVIEW_PATH_FOUND' => [
					'value' => 'NO_PREVIEW_PATH_FOUND'
				],
				'RECEIVED_PREVIEW_DATA_FROM_WRONG_URL' => [
					'value' => 'RECEIVED_PREVIEW_DATA_FROM_WRONG_URL'
				]
			]
		] );

		register_graphql_object_type( 'WPGatsbyPreviewStatus', [
			'description' => __( 'Check compatibility with a given version of gatsby-source-wordpress and the WordPress source site.' ),
			'fields'      => [
				'pageNode' => [
					'type' => 'WPGatsbyPageNode'
				],
				'statusType' => [
					'type' => 'WPGatsbyWPPreviewedNodeStatus'
				],
				'remoteStatus' => [
					'type' => 'WPGatsbyRemotePreviewStatusEnum'
				],
				'modifiedLocal' => [
					'type' => 'String'
				],
				'modifiedRemote' => [
					'type' => 'String'
				],
				'statusContext' => [
					'type' => 'String'
				]
			]
		] );

        register_graphql_field( 'WPGatsby', 'gatsbyPreviewStatus', [
			'description' => __( 'The current status of a Gatsby Preview.', 'wp-gatsby' ),
			'type'        => 'WPGatsbyPreviewStatus',
			'args'        => [
				'nodeId'    => [
					'type'        => [ 'non_null' => 'Number' ],
					'description' => __( 'The post id for the previewed node.', 'wp-gatsby' ),
				],
			],
			'resolve'     => function( $root, $args, $context, $info ) {
				$post_id = $args['nodeId'] ?? null;

				// make sure post_id is a valid post
				$post = get_post( $post_id );

				$post_type_object = $post 
					? get_post_type_object( $post->post_type )
					: null;

				$user_can_edit_this_post = $post
					? current_user_can(
						$post_type_object->cap->edit_posts,
						$post_id
					) 
					: null;

				if ( !$post || !$user_can_edit_this_post ) {
					throw new UserError(
						sprintf(
							__(
								'Sorry, you are not allowed to access the Preview status of post %1$s',
								'wp-gatsby'
							),
							$post_id,
						)
					);
				}

				if ( !$post ) {
					return [
						'statusType' => 'NO_NODE_FOUND',
					];	
				}
				
				$found_preview_path_post_meta = get_post_meta(
					$post_id,
					'_wpgatsby_page_path',
					true,
				);

				$revision = $this::getPreviewablePostObjectByPostId( $post_id );

				$revision_modified = $revision->post_modified ?? null;

				$modified = $revision_modified ?? $post->post_modified;

				$gatsby_node_modified = get_post_meta(
					$post_id,
					'_wpgatsby_node_modified',
					true
				);
				
				$node_was_updated = 
				strtotime( $gatsby_node_modified ) >= strtotime( $modified );
				
				$remote_status = get_post_meta(
					$post_id,
					'_wpgatsby_node_remote_preview_status',
					true
				);

				// if the node wasn't updated, then any status we have is stale
				$remote_status_type = $remote_status && $node_was_updated 
					? $remote_status
					: null;
				
				$status_type = 'PREVIEW_READY';

				if ( !$node_was_updated ) {
					$status_type = 'REMOTE_NODE_NOT_YET_UPDATED';	
				}

				if ( !$found_preview_path_post_meta) {
					$status_type = 'NO_PREVIEW_PATH_FOUND';
				}

				$status_context = get_post_meta(
					$post_id,
					'_wpgatsby_node_remote_preview_status_context',
					true
				);

				if ( $status_context === "" ) {
					$status_context = null;
				}

				$normalized_preview_page_path = 
					$found_preview_path_post_meta !== "" 
						? $found_preview_path_post_meta
						: null;

				return [
					'statusType' => $status_type,
					'statusContext' => $status_context,
					'remoteStatus' => $remote_status_type,
					'pageNode' => [
						'path' => $normalized_preview_page_path
					],
					'modifiedLocal' => $modified,
					'modifiedRemote' => $gatsby_node_modified
				];
			}
		] );
	}

	public function setup_preview_template( $template ) {
		global $post;
		$post_type = get_post_type_object( $post->post_type );

		if ( !$post_type->show_in_graphql ?? true ) {
			return plugin_dir_path( __FILE__ ) . 'includes/post-type-not-shown-in-graphql.php';
		}

		$is_preview  = is_preview();
		$preview_url = \WPGatsby\Admin\Preview::get_gatsby_preview_instance_url();

		if ( $is_preview && $preview_url ) {
			return plugin_dir_path( __FILE__ ) . 'includes/preview-template.php';
		} elseif ( $is_preview && ! $preview_url ) {
			return plugin_dir_path( __FILE__ ) . 'includes/no-preview-url-set.php';
		}

		return $template;
	}

	/**
	 * This is used to print out the client JS file directly to the
	 * Preview template html
	 */
	public static function printFileContents( $fileName ) {
		$pluginDirectory = plugin_dir_path( __FILE__ );
		$filePath = $pluginDirectory . $fileName;
		echo file_get_contents( $filePath );
	}

	/**
	 * Get a WPGatsby setting by setting key
	 */
	static function get_setting( $key ) {
		$wpgatsby_settings = get_option( 'wpgatsby_settings' );

		return $wpgatsby_settings[ $key ] ?? null;
	}

	/**
	 * Get the normalized/validated frontend url of the Gatsby Preview
	 */
	static function get_gatsby_preview_instance_url() {
		$preview_url = self::get_setting( 'preview_instance_url' );

		if ( ! $preview_url || ! filter_var( $preview_url, FILTER_VALIDATE_URL ) ) {
			return false;
		}

		if ( substr( $preview_url, - 1 ) !== '/' ) {
			$preview_url = "$preview_url/";
		}

		return $preview_url;
	}

	/**
	 * Get the Gatsby Preview instance refresh webhook
	 */
	static function get_gatsby_preview_webhook() {
		$preview_webhook = self::get_setting( 'preview_api_webhook' );

		if (
			! $preview_webhook ||
			! filter_var( $preview_webhook, FILTER_VALIDATE_URL )
		) {
			return false;
		}

		if ( substr( $preview_webhook, - 1 ) !== '/' ) {
			$preview_webhook = "$preview_webhook/";
		}

		return $preview_webhook;
	}

	/**
	 * Send a Preview to Gatsby
	 */
	public function post_to_preview_instance( $post_ID, $post ) {
		$revisions_are_disabled = 
			!wp_revisions_enabled( $post );

		if (
			defined( 'DOING_AUTOSAVE' )
			&& DOING_AUTOSAVE
			// if revisions are disabled, our autosave is our preview
			&& !$revisions_are_disabled
		) {
			return;
		}

		if ( $post->post_type === 'action_monitor' ) {
			return;
		}

		if ( $post->post_status === 'auto-draft'  ) {
			return;
		}

		$is_new_post_draft =
			$post->post_status === 'draft' &&
			$post->post_date_gmt === '0000-00-00 00:00:00';

		$is_revision = $post->post_type === 'revision';
		$is_draft = $post->post_status === 'draft';

		if ( !$is_revision && !$is_new_post_draft ) {
			return;
		}

		$token = \WPGatsby\GraphQL\Auth::get_token();

		if ( ! $token ) {
			error_log(
				'Please set a JWT token in WPGatsby to enable Preview support.'
			);
			return;
		}

		$preview_webhook = $this::get_gatsby_preview_webhook();

		$original_post = get_post( $post->post_parent );

		$parent_post_id = $original_post->ID ?? $post_ID;

		$post_type_object = $original_post
			? \get_post_type_object( $original_post->post_type )
			: \get_post_type_object( $post->post_type );

		if ( !$post_type_object->show_in_graphql ?? true ) {
			// if the post type doesn't have show_in_graphql set,
			// we don't want to send a preview webhook for this post type
			return;
		}

		$last_sent_modified_time = $this::getLastSentModifiedTimeByPostId(
			$parent_post_id
		);

		$last_sent_modified_time_unix = strtotime( $last_sent_modified_time );
		$this_sent_modified_time_unix = strtotime( $post->post_modified );

		$difference_between_last_modified_and_this_modified = 
			$this_sent_modified_time_unix - $last_sent_modified_time_unix;

		if (
			$last_sent_modified_time &&
			(
				// if the last time was the same as this
				$last_sent_modified_time === $post->post_modified ||
				// or the last time was within the last 5 seconds
				$difference_between_last_modified_and_this_modified < 5
			)
		) {
			// we've already sent a webhook for this revision.
			// return early to prevent extra builds
			return;
		} else {
			// otherwise store this modified time so we can compare it next time
			update_post_meta(
				$parent_post_id,
				self::$last_sent_modified_time_key,
				$post->post_modified
			);
		}

		$global_relay_id = Relay::toGlobalId(
			'post',
			// sometimes this is a draft instead of a revision
			// so we can't expect original post to exist
			absint( $original_post->ID ?? $post_ID )
		);

		$referenced_node_single_name
			= $post_type_object->graphql_single_name ?? null;

		$graphql_endpoint = apply_filters( 'graphql_endpoint', 'graphql' );

		$graphql_url = get_site_url() . '/' . ltrim( $graphql_endpoint, '/' );

		$post_body = [
			'preview'              => true,
			'token'                => $token,
			'previewId'            => $post_ID,
			'id'                   => $global_relay_id,
			'singleName'           => $referenced_node_single_name,
			'isNewPostDraft'       => $is_new_post_draft,
			'isDraft'              => $is_draft,
			'isRevision'           => $is_revision,
			'remoteUrl'            => $graphql_url,
			'modified'             => $post->post_modified,
			'parentId'             => $post->post_parent,
			'revisionsAreDisabled' => $revisions_are_disabled
		];

		$response = wp_remote_post(
			$preview_webhook,
			[
				'body'        => wp_json_encode( $post_body ),
				'headers'     => [
					'Content-Type' => 'application/json; charset=utf-8'
				],
				'method'      => 'POST',
				'data_format' => 'body',
			]
		);

		$is_wp_error = is_wp_error( $response );

		$status_code = !$is_wp_error ? $response['response']['code'] ?? null : null;

		// this is used to optimistically load the preview iframe
		// we also check if the frontend is responding to requests from the 
		// preview template JS
		$webhook_success = 
			!$is_wp_error &&
			(
				$status_code === 200 ||
				$status_code === 204
			);

		update_option(
			'_wp_gatsby_preview_webhook_is_online',
			$webhook_success, // boolean
			true
		); 

		if ( !$webhook_success ) {
			error_log(
				'WPGatsby couldn\'t reach the Preview webhook set in plugin options.'
			);	
		}
	}
}
