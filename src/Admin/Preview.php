<?php

namespace WPGatsby\Admin;

use GraphQL\Error\UserError;
use WPGraphQL\Router;
use WPGatsby\Admin\Settings;

class Preview {
	function __construct() {
		add_action(
			'graphql_register_types',
			function() {
				$this->register_preview_status_fields_and_mutations();
			}
		);
	}

	public static function get_gatsby_content_sync_url_for_post( $post ) {
		// get the Gatsby Cloud loader url w/ site id
		$gatsby_content_sync_url = Settings::get_setting( 'gatsby_content_sync_url' );
					
		// create the dynamic path the loader will need
		$manifest_id = self::get_preview_manifest_id_for_post( $post );
		$path = "/gatsby-source-wordpress/$manifest_id";

		$url = preg_replace(
			// remove any double forward slashes from the path
			'/([^:])(\/{2,})/', '$1/',
			"$gatsby_content_sync_url$path"
		);

		return $url;
	}

	public static function get_previewable_post_object_by_post_id( $post_id ) {
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


	public static function get_preview_manifest_id_for_post( $post ) {
		$revision = self::get_previewable_post_object_by_post_id( $post->ID );
		$revision_modified = $revision->post_modified ?? null;

		$modified = 
			$post->post_status === "draft"
				? $post->post_modified
				: $revision_modified;

		if ( ! $modified || $modified === "" ) {
			return null;
		}

		$manifest_id = $post->ID . $modified;

		return $manifest_id;
	}

	/**
	 * This is used to print out the client CSS file directly to the
	 * Preview template html when Content Sync isn't set up correctly.
	 */
	public static function print_file_contents( $fileName ) {
		$pluginDirectory = plugin_dir_path( __FILE__ );
		$filePath        = $pluginDirectory . $fileName;
		echo file_get_contents( $filePath );
	}

	function register_preview_status_fields_and_mutations() {
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
					// parentDatabaseId is the only input arg we need now.
					// the rest are left for backwards compatibility so errors aren't thrown.
					'parentDatabaseId' => [
						'type'        => 'Number',
						'description' => __( 'The previewed revisions post parent id', 'wp-gatsby' ),
					],
					'pagePath'         => [
						'type'        => 'String',
						'description' => __( 'The Gatsby page path for this preview.', 'wp-gatsby' ),
					],
					'modified'         => [
						'type'        => 'String',
						'description' => __( 'The modified date of the latest revision for this preview.', 'wp-gatsby' ),
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
					$parent_id = $input['parentDatabaseId'] ?? null;
					
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
						$node_modified_was_updated
						&& (
						'NO_PAGE_CREATED_FOR_PREVIEWED_NODE' === $remote_status
						|| 'RECEIVED_PREVIEW_DATA_FROM_WRONG_URL' === $remote_status
						)
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
							self::get_gatsby_preview_instance_url(
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

						error_log(print_r('$modified_response', true)); 
						error_log(print_r($modified_response, true)); 
						error_log(print_r('$modified', true)); 
						error_log(print_r($modified, true)); 

						$preview_was_deployed =
							$modified_response &&
							strtotime( $modified_response ) >= strtotime( $modified );

						error_log(print_r('$preview_was_deployed', true)); 
						error_log(print_r($preview_was_deployed, true)); 

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
}
