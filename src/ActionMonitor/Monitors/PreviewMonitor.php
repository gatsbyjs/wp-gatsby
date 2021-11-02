<?php

namespace WPGatsby\ActionMonitor\Monitors;

use GraphQLRelay\Relay;
use WPGatsby\Admin\Preview;
use WPGatsby\Admin\Settings;

class PreviewMonitor extends Monitor {
	function init() {
		$enable_gatsby_preview = Settings::get_setting( 'enable_gatsby_preview' ) === 'on';

		if ( $enable_gatsby_preview ) {
			add_filter( 'template_include', [ $this, 'setup_preview_template' ], 1, 99 );

			add_filter( 'preview_post_link', function( $link, $post ) {
				$doing_graphql_request
					= defined( 'GRAPHQL_REQUEST' ) && true === GRAPHQL_REQUEST;

				// Use the normal $link during graphql requests
				// because otherwise we could override the post URI
				// in Gatsby! meaning the content sync or preview url could be added to the page path in Gatsby if pages are created from the uri.
				if ( $doing_graphql_request ) {
					return $link;
				}

				return \add_query_arg( 'gatsby_preview', 'true', $link );
			}, 10, 2 );
		}
	}

	/**
	 * Determines wether or not the current global 
	 * PHP context is related to Gatsby Content Sync Previews
	 */
	public static function is_gatsby_content_sync_preview() {
		$doing_graphql_request
					= defined( 'GRAPHQL_REQUEST' ) && null !== GRAPHQL_REQUEST;

		if ( $doing_graphql_request ) {
			return false;
		}

		$enable_gatsby_preview = Settings::get_setting( 'enable_gatsby_preview' ) === 'on';

		$is_gatsby_content_sync_preview 
			= \is_preview()
			|| isset( $_GET['preview_nonce'] )
			|| isset( $_GET['gatsby_preview'] );

		return $is_gatsby_content_sync_preview && $enable_gatsby_preview;
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

		if ( self::is_gatsby_content_sync_preview() && $post ) {
			// Ensure the post_type is set to show_in_graphql
			$post_type_object = $post->post_type ? get_post_type_object( $post->post_type ) : null;

			if ( $post_type_object && ! $post_type_object->show_in_graphql ?? true ) {
				return plugin_dir_path( __FILE__ ) . '../../Admin/includes/post-type-not-shown-in-graphql.php';
			}

			// WP doesn't call post_save for every second preview with no content changes.
			// Since we're using post_save to trigger the webhook to Gatsby, we need to get WP to call post_save for this post.
			do_action( 'save_post', $post->ID, $post, true );

			$this->post_to_preview_instance( $post->ID, $post );
		
			return trailingslashit( dirname( __FILE__ ) ) . '../../Admin/includes/preview-template.php';
		}

		return $template;
	}

	/**
	 * Send a Preview to Gatsby
	 */
	public function post_to_preview_instance( $post_ID, $post ) {
		$revisions_are_disabled = 
			! wp_revisions_enabled( $post );

		if (
			defined( 'DOING_AUTOSAVE' )
			&& DOING_AUTOSAVE
			// if revisions are disabled, our autosave is our preview
			&& ! $revisions_are_disabled
		) {
			return;
		}

		if ( $post->post_type === 'action_monitor' ) {
			return;
		}

		if ( $post->post_status === 'auto-draft'  ) {
			return;
		}

		$is_draft = $post->post_status === 'draft';

		$is_new_post_draft =
			(
				$post->post_status === 'auto-draft'
				|| $post->post_status === 'draft'
			) &&
			$post->post_date_gmt === '0000-00-00 00:00:00';

		$is_revision = $post->post_type === 'revision';
		$is_draft = $post->post_status === 'draft';

		$is_gatsby_content_sync_preview = self::is_gatsby_content_sync_preview();


		if (
			! $is_draft
			&& ! $is_revision
			&& ! $is_new_post_draft
			&& ! $is_gatsby_content_sync_preview
		) {
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
			$original_post
			&& $original_post->post_modified === $post->post_modified
			&& ! $is_gatsby_content_sync_preview;

			
		if ( $this_is_a_publish_not_a_preview ) {
			// we will handle this in ActionMonitor.php, not here.
			return;
		}

		$post_type_object = $original_post
			? \get_post_type_object( $original_post->post_type )
			: \get_post_type_object( $post->post_type );

		if ( ! $post_type_object->show_in_graphql ?? true ) {
			// if the post type doesn't have show_in_graphql set,
			// we don't want to send a preview webhook for this post type.
			return;
		}
		
		$parent_post_id = $original_post->ID ?? $post_ID;

		$global_relay_id = Relay::toGlobalId(
			'post',
			// sometimes this is a draft instead of a revision
			// so we can't expect original post to exist.
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

		$preview_data = [
			'previewDatabaseId' => $post_ID,
			'id'                => $global_relay_id,
			'singleName'        => $referenced_node_single_name_normalized,
			'isDraft'           => $is_draft,
			'remoteUrl'         => $graphql_url,
			'modified'          => $post->post_modified,
			'parentDatabaseId'  => $post->post_parent,
			'userDatabaseId'    => get_current_user_id(),
		];
		
		$post_body = array_merge(
			$preview_data,
			[
				'token' => $token
			]
		);

		$this->log_action( [
			'action_type'         => 'UPDATE',
			'title'               => $post->post_title,
			'node_id'             => $parent_post_id,
			'relay_id'            => $global_relay_id,
			'graphql_single_name' => $referenced_node_single_name_normalized,
			'graphql_plural_name' => $referenced_node_plural_name_normalized,
			// everything that should show in Gatsby is publish
			// as far as Gatsby is concerned.
			'status'              => 'publish',
			'stream_type'         => 'PREVIEW',
			'preview_data'        => wp_json_encode( $preview_data ),
		] );

		// @todo move this to shutdown hook to prevent race conditions
		$response = wp_remote_post(
			$preview_webhook,
			[
				'body'        => wp_json_encode( $post_body ),
				'headers'     => [
					'Content-Type' => 'application/json; charset=utf-8',
				],
				'method'      => 'POST',
				'data_format' => 'body',
			]
		);

		if ( \is_wp_error( $response ) ) {
			error_log( "WPGatsby couldn\'t POST to the Preview webhook set in plugin options.\nWebhook returned error: {$response->get_error_message()}" );
		}
	}

	/**
	 * Get the Gatsby Preview instance refresh webhook
	 */
	static function get_gatsby_preview_webhook() {
		$preview_webhook = Settings::get_setting( 'preview_api_webhook' );

		if ( ! $preview_webhook || ! filter_var( $preview_webhook, FILTER_VALIDATE_URL ) ) {
			return false;
		}

		if ( substr( $preview_webhook, -1 ) !== '/' ) {
			$preview_webhook .= '/';
		}

		return $preview_webhook;
	}
}
