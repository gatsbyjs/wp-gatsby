<?php

namespace WPGatsby\ActionMonitor\Monitors;

use GraphQLRelay\Relay;
use GraphQL\Error\UserError;
use WPGraphQL\Router;
use \WPGatsby\Admin\Settings;
use WPGatsby\Admin\Preview;

class PreviewMonitor extends Monitor {
	public static $last_sent_modified_time_key = '_wpgatsby_last_preview_modified_time';

	function init() {
    	$enable_gatsby_preview = Settings::get_setting('enable_gatsby_preview');

		if ($enable_gatsby_preview === 'on') {
			add_action( 'save_post', [ $this, 'post_to_preview_instance' ], 10, 2 );

			add_action( 'graphql_register_types', function() {
				$this->registerPreviewStatusFieldsAndMutations ();
			} );
		}
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
					$message = sprintf(
						__(
							'Sorry, you are not allowed to update post %1$s',
							'wp-gatsby'
						),
						$parent_id
					);

					throw new UserError( $message );
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
				],
				'PREVIEW_PAGE_UPDATED_BUT_NOT_YET_DEPLOYED' => [
					'value' => 'PREVIEW_PAGE_UPDATED_BUT_NOT_YET_DEPLOYED'
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
							$post_id
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
					true
				);

				$revision = Preview::getPreviewablePostObjectByPostId( $post_id );

				$revision_modified = $revision->post_modified ?? null;

				$modified = $revision_modified ?? $post->post_modified;

				$gatsby_node_modified = get_post_meta(
					$post_id,
					'_wpgatsby_node_modified',
					true
				);

				$remote_status = get_post_meta(
					$post_id,
					'_wpgatsby_node_remote_preview_status',
					true
				);
				
				$node_modified_was_updated =
					strtotime( $gatsby_node_modified ) >= strtotime( $modified );

				if (
					$node_modified_was_updated &&
					$remote_status === 'NO_PAGE_CREATED_FOR_PREVIEWED_NODE'
				) {
					return [
						'statusType' => null,
						'statusContext' => null,
						'remoteStatus' => $remote_status
					];
				}

				$node_was_updated = false;

				if ( $node_modified_was_updated && $found_preview_path_post_meta ) {
					$server_side = true;
					
					$gatbsy_preview_frontend_url =
						\WPGatsby\Admin\Preview::get_gatsby_preview_instance_url(
							$server_side
						);
						
					$modified_deployed_url = 
						$gatbsy_preview_frontend_url .
						"page-data/$found_preview_path_post_meta/page-data.json";
						
					// check if node page was deployed
					$request = wp_remote_get( $modified_deployed_url );
					$response = wp_remote_retrieve_body( $request );

					$page_data = json_decode( $response );

					$modified_response =
						$page_data->result->pageContext->__wpGatsbyNodeModified
						?? null;

					$preview_was_deployed =
						$modified_response &&
						strtotime( $modified_response ) >= strtotime( $modified );
					
					if ( ! $preview_was_deployed ) {
						// if preview was not yet deployed, send back PREVIEW_PAGE_UPDATED_BUT_NOT_YET_DEPLOYED
						return [
							'statusType' =>
							'PREVIEW_PAGE_UPDATED_BUT_NOT_YET_DEPLOYED',
							'statusContext' => null,
							'remoteStatus' => null
						];
					} else {
						// if it is deployed, send back PREVIEW_READY below
						$node_was_updated = true;
					}
				}

				// if the node wasn't updated, then any status we have is stale
				$remote_status_type = $remote_status && $node_was_updated 
					? $remote_status
					: null;

				/**
				 * We need the above check for wether the node was updated so we 
				 * don't show stale statuses on existing nodes, but in the case that 
				 * it's a brand new draft, $node_was_updated will always be false 
				 * because at this point we're potentially getting an error on a 
				 * node that was never created. So GATSBY_PREVIEW_PROCESS_ERROR is a 
				 * special case where we always need to show the status regardless 
				 * of wether the node was updated.
				 */
				if ( $remote_status === 'GATSBY_PREVIEW_PROCESS_ERROR' ) {
					$remote_status_type = $remote_status;
				}
				
				$status_type = 'PREVIEW_READY';

				if ( !$node_was_updated ) {
					$status_type = 'REMOTE_NODE_NOT_YET_UPDATED';	
				}

				if ( !$found_preview_path_post_meta ) {
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

        register_graphql_field( 'WPGatsby', 'isPreviewFrontendOnline', [
			'description' => __( 'Wether or not the Preview frontend URL is online.', 'wp-gatsby' ),
			'type'        => 'Boolean',
			'resolve'     => function( $root, $args, $context, $info ) {
				if ( ! is_user_logged_in() ) {
					return false;
				}

				$preview_url  = Settings::get_gatsby_preview_instance_url();

				$request = wp_remote_get( $preview_url );

				$request_was_successful = 
					$this->was_request_successful( $request );

				return $request_was_successful;
			}
		] );
	}

	/**
	 * Get the Gatsby Preview instance refresh webhook
	 */
	static function get_gatsby_preview_webhook() {
		$preview_webhook = Settings::get_setting( 'preview_api_webhook' );

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
			(
				$post->post_status === 'auto-draft'
				|| $post->post_status === 'draft'
			) &&
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

		$this_is_a_publish_not_a_preview = 
			$original_post && $original_post->post_modified === $post->post_modified;

		if ( $this_is_a_publish_not_a_preview ) {
			// we will handle this in ActionMonitor.php, not here
			return;
		}

		$parent_post_id = $original_post->ID ?? $post_ID;

		$post_type_object = $original_post
			? \get_post_type_object( $original_post->post_type )
			: \get_post_type_object( $post->post_type );

		if ( !$post_type_object->show_in_graphql ?? true ) {
			// if the post type doesn't have show_in_graphql set,
			// we don't want to send a preview webhook for this post type
			return;
		}

		$last_sent_modified_time = Preview::getLastSentModifiedTimeByPostId(
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
			
		$referenced_node_single_name_normalized = lcfirst(
			$referenced_node_single_name
		);

		$referenced_node_plural_name
			= $post_type_object->graphql_plural_name ?? null;
			
		$referenced_node_plural_name_normalized = lcfirst(
			$referenced_node_plural_name
		);

		$graphql_endpoint = apply_filters( 'graphql_endpoint', 'graphql' );

		$graphql_url = get_site_url() . '/' . ltrim( $graphql_endpoint, '/' );

		$post_body = [
			'preview'              => true,
			'token'                => $token,
			'previewId'            => $post_ID,
			'id'                   => $global_relay_id,
			'singleName'           => $referenced_node_single_name_normalized,
			'isNewPostDraft'       => $is_new_post_draft,
			'isDraft'              => $is_draft,
			'isRevision'           => $is_revision,
			'remoteUrl'            => $graphql_url,
			'modified'             => $post->post_modified,
			'parentId'             => $post->post_parent,
			'revisionsAreDisabled' => $revisions_are_disabled
        ];

		$this->log_action( [
			'action_type'         => 'UPDATE',
			'title'               => $post->post_title,
			'node_id'             => $post_ID,
			'relay_id'            => $global_relay_id,
			'graphql_single_name' => $referenced_node_single_name_normalized,
			'graphql_plural_name' => $referenced_node_plural_name_normalized,
			// everything that should show in Gatsby is publish
			// as far as Gatsby is concerned.
			'status'              => 'publish',
			'stream_type'         => 'PREVIEW'
		] );

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

		// this is used to optimistically load the preview iframe
		// we also check if the frontend is responding to requests from the 
		// preview template JS
		$webhook_success = $this->was_request_successful( $response );

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

	function was_request_successful( $response ) {
		$is_wp_error = is_wp_error( $response );

		$status_code = !$is_wp_error ? $response['response']['code'] ?? null : null;
		$response_message_was_ok = !$is_wp_error ? $response['response']['message'] === 'OK' ?? null : null;

		// this is used to optimistically load the preview iframe
		// we also check if the frontend is responding to requests from the 
		// preview template JS
		$success = 
			!$is_wp_error &&
			(
				$status_code === 200 ||
				$status_code === 204 ||
				$response_message_was_ok
			);

		return $success;
	}
}
