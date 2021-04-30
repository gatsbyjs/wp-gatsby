<?php

namespace WPGatsby\Admin;

use GraphQL\Error\UserError;
use WPGraphQL\Router;

class Preview {

	public static $last_sent_modified_time_key = '_wpgatsby_last_preview_modified_time';

	function __construct() {
		$enable_gatsby_preview = self::get_setting( 'enable_gatsby_preview' );

		if ( $enable_gatsby_preview === 'on' ) {
			add_filter( 'template_include', [ $this, 'setup_preview_template' ], 1, 99 );

			add_action(
				'graphql_register_types',
				function() {
					$this->registerPreviewStatusFieldsAndMutations();
				}
			);
		}
	}

	public static function print_initial_preview_template_state_js() {
		global $post;
		$post_id = $post->ID;

		$preview_url = self::get_gatsby_preview_instance_url();
		$preview_url = rtrim( $preview_url, '/' );

		$preview_webhook_online = get_option(
			'_wp_gatsby_preview_webhook_is_online'
		);

		$initial_state = json_encode(
			[
				'postId'                 => $post_id,
				'previewFrontendUrl'     => $preview_url,
				'previewWebhookIsOnline' => $preview_webhook_online,
				'graphqlEndpoint'        => Router::$route,
				'webhookWasCalled'       => self::was_preview_webhook_called_for_post_id(
					$post_id
				),
				'wordpressSiteUrl' 		=> get_site_url()
			]
		);

		echo "var initialState = $initial_state; console.log({ initialState: initialState });";
	}

	public static function get_last_sent_modified_time_by_post_id( $post_id ) {
		return get_post_meta(
			$post_id,
			self::$last_sent_modified_time_key,
			true
		);
	}

	static function was_preview_webhook_called_for_post_id( $post_id ) {
		$revision = self::getPreviewablePostObjectByPostId( $post_id );

		$revision_modified = $revision->post_modified ?? null;

		$last_sent_modified_time = self::get_last_sent_modified_time_by_post_id(
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
		register_graphql_enum_type(
			'WPGatsbyRemotePreviewStatusEnum',
			[
				'description' => __( 'The different statuses a Gatsby Preview can be in for a single node.', 'wp-gatsby' ),
				'values'      => [
					'PREVIEW_SUCCESS'                      => [
						'value' => 'PREVIEW_SUCCESS',
					],
					'NO_PAGE_CREATED_FOR_PREVIEWED_NODE'   => [
						'value' => 'NO_PAGE_CREATED_FOR_PREVIEWED_NODE',
					],
					'GATSBY_PREVIEW_PROCESS_ERROR'         => [
						'value' => 'GATSBY_PREVIEW_PROCESS_ERROR',
					],
					'RECEIVED_PREVIEW_DATA_FROM_WRONG_URL' => [
						'value' => 'RECEIVED_PREVIEW_DATA_FROM_WRONG_URL',
					],
				],
			]
		);

		register_graphql_mutation(
			'wpGatsbyRemotePreviewStatus',
			[
				'inputFields'         => [
					'pagePath'         => [
						'type'        => 'String',
						'description' => __( 'The Gatsby page path for this preview.', 'wp-gatsby' ),
					],
					'modified'         => [
						'type'        => 'String',
						'description' => __( 'The modified date of the latest revision for this preview.', 'wp-gatsby' ),
					],
					'parentDatabaseId' => [
						'type'        => 'Number',
						'description' => __( 'The previewed revisions post parent id', 'wp-gatsby' ),
					],
					'status'           => [
						'type'        => [ 'non_null' => 'WPGatsbyRemotePreviewStatusEnum' ],
						'description' => __( 'The remote status of the previewed node', 'wp-gatsby' ),
					],
					'statusContext'    => [
						'type'        => 'String',
						'description' => __( 'Additional context about the preview status', 'wp-gatsby' ),
					],
				],
				'outputFields'        => [
					'success' => [
						'type'        => 'Boolean',
						'description' => __( 'Wether or not the revision mutation was successful', 'wp-gatsby' ),
						'resolve'     => function( $payload, $args, $context, $info ) {
							$success = $payload['success'] ?? null;

							return [
								'success' => $success,
							];
						},
					],
				],
				'mutateAndGetPayload' => function( $input, $context, $info ) {
					$page_path       = $input['pagePath'] ?? null;
					$modified        = $input['modified'] ?? null;
					$parent_id       = $input['parentDatabaseId'] ?? null;
					$remote_status   = $input['status'] ?? null;
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

					if ( ! $post || ! $user_can_edit_this_post ) {
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

					// delete action monitor preview action.
					// once we've saved this preview status as succes
					// we don't need the preview action anymore.
					$existing = new \WP_Query( [
						'post_type'      => 'action_monitor',
						'post_status'    => 'any',
						'posts_per_page' => 1,
						'no_found_rows'  => true,
						'fields'         => 'ids',
						'tax_query'      => [
							'relation' => 'AND',
							[
								'taxonomy' => 'gatsby_action_ref_node_dbid',
								'field'    => 'name',
								'terms'    => sanitize_text_field( $parent_id ),
							],
							[
								'taxonomy' => 'gatsby_action_stream_type',
								'field'    => 'name',
								'terms'    => 'PREVIEW',
							]
						],
					] );

					if ( isset( $existing->posts ) && ! empty( $existing->posts ) ) {
						wp_delete_post( $existing->posts[0], true );
					}

					return [
						'success' => true,
					];
				},
			]
		);

		register_graphql_object_type(
			'WPGatsbyPageNode',
			[
				'description' => __( 'A previewed Gatsby page node.' ),
				'fields'      => [
					'path' => [
						'type' => 'String',
					],
				],
			]
		);

		register_graphql_enum_type(
			'WPGatsbyWPPreviewedNodeStatus',
			[
				'description' => __( 'The different statuses a Gatsby Preview can be in for a single node.', 'wp-gatsby' ),
				'values'      => [
					'NO_NODE_FOUND'                             => [
						'value' => 'NO_NODE_FOUND',
					],
					'PREVIEW_READY'                             => [
						'value' => 'PREVIEW_READY',
					],
					'REMOTE_NODE_NOT_YET_UPDATED'               => [
						'value' => 'REMOTE_NODE_NOT_YET_UPDATED',
					],
					'NO_PREVIEW_PATH_FOUND'                     => [
						'value' => 'NO_PREVIEW_PATH_FOUND',
					],
					'RECEIVED_PREVIEW_DATA_FROM_WRONG_URL'      => [
						'value' => 'RECEIVED_PREVIEW_DATA_FROM_WRONG_URL',
					],
					'PREVIEW_PAGE_UPDATED_BUT_NOT_YET_DEPLOYED' => [
						'value' => 'PREVIEW_PAGE_UPDATED_BUT_NOT_YET_DEPLOYED',
					],
				],
			]
		);

		register_graphql_object_type(
			'WPGatsbyPreviewStatus',
			[
				'description' => __( 'Check compatibility with a given version of gatsby-source-wordpress and the WordPress source site.' ),
				'fields'      => [
					'pageNode'       => [
						'type' => 'WPGatsbyPageNode',
					],
					'statusType'     => [
						'type' => 'WPGatsbyWPPreviewedNodeStatus',
					],
					'remoteStatus'   => [
						'type' => 'WPGatsbyRemotePreviewStatusEnum',
					],
					'modifiedLocal'  => [
						'type' => 'String',
					],
					'modifiedRemote' => [
						'type' => 'String',
					],
					'statusContext'  => [
						'type' => 'String',
					],
				],
			]
		);

		register_graphql_field(
			'WPGatsby',
			'gatsbyPreviewStatus',
			[
				'description' => __( 'The current status of a Gatsby Preview.', 'wp-gatsby' ),
				'type'        => 'WPGatsbyPreviewStatus',
				'args'        => [
					'nodeId' => [
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

					if ( ! $post || ! $user_can_edit_this_post ) {
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

					if ( ! $post ) {
						return [
							'statusType' => 'NO_NODE_FOUND',
						];
					}

					$found_preview_path_post_meta = get_post_meta(
						$post_id,
						'_wpgatsby_page_path',
						true
					);

					$revision = $this::getPreviewablePostObjectByPostId( $post_id );

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
						$node_modified_was_updated
						&& 'NO_PAGE_CREATED_FOR_PREVIEWED_NODE' === $remote_status
					) {
						return [
							'statusType'    => null,
							'statusContext' => null,
							'remoteStatus'  => $remote_status,
						];
					}

					$node_was_updated = false;

					if ( $node_modified_was_updated && $found_preview_path_post_meta ) {
						$server_side = true;

						$gatbsy_preview_frontend_url =
							\WPGatsby\Admin\Preview::get_gatsby_preview_instance_url(
								$server_side
							);

						$page_data_path = $found_preview_path_post_meta === "/" 
							? "/index/"
							: $found_preview_path_post_meta;
		
						$page_data_path_trimmed = trim( $page_data_path, "/" );

						$modified_deployed_url =
							$gatbsy_preview_frontend_url .
							"page-data/$page_data_path_trimmed/page-data.json";

						// check if node page was deployed
						$request  = wp_remote_get( $modified_deployed_url );
						$response = wp_remote_retrieve_body( $request );

						$page_data = json_decode( $response );

						$modified_response =
							$page_data->result->pageContext->__wpGatsbyNodeModified
							?? null;

						$preview_was_deployed =
							$modified_response &&
							strtotime( $modified_response ) >= strtotime( $modified );

						if ( ! $preview_was_deployed ) {
							// if preview was not yet deployed, send back PREVIEW_PAGE_UPDATED_BUT_NOT_YET_DEPLOYED.
							return [
								'statusType'    =>
									'PREVIEW_PAGE_UPDATED_BUT_NOT_YET_DEPLOYED',
								'statusContext' => null,
								'remoteStatus'  => null,
							];
						} else {
							// if it is deployed, send back PREVIEW_READY below.
							$node_was_updated = true;
						}
					}

					// if the node wasn't updated, then any status we have is stale.
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
					if ( 'GATSBY_PREVIEW_PROCESS_ERROR' === $remote_status ) {
						$remote_status_type = $remote_status;
					}

					$status_type = 'PREVIEW_READY';

					if ( ! $node_was_updated ) {
						$status_type = 'REMOTE_NODE_NOT_YET_UPDATED';
					}

					if ( ! $found_preview_path_post_meta ) {
						$status_type = 'NO_PREVIEW_PATH_FOUND';
					}

					$status_context = get_post_meta(
						$post_id,
						'_wpgatsby_node_remote_preview_status_context',
						true
					);

					if ( $status_context === '' ) {
						$status_context = null;
					}

					$normalized_preview_page_path =
						$found_preview_path_post_meta !== ''
							? $found_preview_path_post_meta
							: null;

					return [
						'statusType'     => $status_type,
						'statusContext'  => $status_context,
						'remoteStatus'   => $remote_status_type,
						'pageNode'       => [
							'path' => $normalized_preview_page_path,
						],
						'modifiedLocal'  => $modified,
						'modifiedRemote' => $gatsby_node_modified,
					];
				},
			]
		);

		register_graphql_field(
			'WPGatsby',
			'isPreviewFrontendOnline',
			[
				'description' => __( 'Wether or not the Preview frontend URL is online.', 'wp-gatsby' ),
				'type'        => 'Boolean',
				'resolve'     => function( $root, $args, $context, $info ) {
					if ( ! is_user_logged_in() ) {
						return false;
					}

					$preview_url = self::get_gatsby_preview_instance_url();

					$request = wp_remote_get( $preview_url );

					$request_was_successful =
						$this->was_request_successful( $request );

					return $request_was_successful;
				},
			]
		);
	}

	/**
	 * If specific conditions are met, this loads the Gatsby Preview template
	 * instead of the core WordPress preview template
	 *
	 * @param string $template The template to load
	 *
	 * @return string
	 */
	public function setup_preview_template( $template ) {
		global $post;

		// If the global post isn't set, but the preview_id is passed, use that to determine
		// the preview post
		if ( empty( $post ) && isset( $_GET['preview_id'] ) ) {
			$post = get_post( $_GET['preview_id'] );
		}

		// Determine the post_type of the post to be previewed
		$post_type = $post->post_type ?? null;

		// Ensure the post_type is set to show_in_graphql
		$post_type_object = $post_type ? get_post_type_object( $post->post_type ) : null;
		if ( $post_type && ! $post_type_object->show_in_graphql ?? true ) {
			return plugin_dir_path( __FILE__ ) . 'includes/post-type-not-shown-in-graphql.php';
		}

		// Determine if it's a preview
		$is_preview  = is_preview() || isset( $_GET['preview_nonce'] );
		$preview_url = self::get_gatsby_preview_instance_url();

		if ( $is_preview && $preview_url ) {
			return trailingslashit( dirname( __FILE__ ) ) . 'includes/preview-template.php';
		} elseif ( $is_preview && ! $preview_url ) {
			return trailingslashit( dirname( __FILE__ ) ) . 'includes/no-preview-url-set.php';
		}

		return $template;
	}

	/**
	 * This is used to print out the client JS file directly to the
	 * Preview template html
	 */
	public static function printFileContents( $fileName ) {
		$pluginDirectory = plugin_dir_path( __FILE__ );
		$filePath        = $pluginDirectory . $fileName;
		echo file_get_contents( $filePath );
	}

	/**
	 * Get a WPGatsby setting by setting key
	 *
	 * @param string $key The name of the setting to get the value for
	 */
	static function get_setting( string $key ) {
		$wpgatsby_settings = get_option( 'wpgatsby_settings' );

		return isset( $wpgatsby_settings[ $key ] ) ? $wpgatsby_settings[ $key ] : null;
	}

	/**
	 * Get the normalized/validated frontend url of the Gatsby Preview
	 */
	static function get_gatsby_preview_instance_url( $server_side = false ) {
		$preview_url = self::get_setting( 'preview_instance_url' );

		$preview_url_exploded = explode( ',', $preview_url );

		// this allows using a different url as the frontend url
		// on the server side and in the preview browser
		// for our tests we need to use http://host.docker.internal:8000 for the PHP
		// side checks for wether or not the page-data.json has deployed
		// but we need to run the preview-template.php code with the frontend url as
		// http://localhost:8000
		// So this allows passing
		// "http://host.docker.internal:8000,http://localhost:8000"
		// as the server preview frontend and template preview frontend
		if ( count( $preview_url_exploded ) > 1 ) {
			$preview_url = $server_side
				? $preview_url_exploded[0]
				: $preview_url_exploded[1];
		}

		if ( ! $preview_url || ! filter_var( $preview_url, FILTER_VALIDATE_URL ) ) {
			return false;
		}

		if ( substr( $preview_url, -1 ) !== '/' ) {
			$preview_url .= '/';
		}

		return $preview_url;
	}

	/**
	 * Get the Gatsby Preview instance refresh webhook
	 */
	static function get_gatsby_preview_webhook() {
		$preview_webhook = self::get_setting( 'preview_api_webhook' );

		if ( ! $preview_webhook
		     || ! filter_var( $preview_webhook, FILTER_VALIDATE_URL )
		) {
			return false;
		}

		if ( substr( $preview_webhook, -1 ) !== '/' ) {
			$preview_webhook .= '/';
		}

		return $preview_webhook;
	}

	public static function was_request_successful( $response ) {
		$is_wp_error = is_wp_error( $response );

		$status_code             = ! $is_wp_error ? $response['response']['code'] ?? null : null;
		$response_message_was_ok = ! $is_wp_error ? $response['response']['message'] === 'OK' ?? null : null;

		// this is used to optimistically load the preview iframe
		// we also check if the frontend is responding to requests from the
		// preview template JS
		$success =
			! $is_wp_error &&
			(
				$status_code === 200 ||
				$status_code === 204 ||
				$response_message_was_ok
			);

		return $success;
	}
}
