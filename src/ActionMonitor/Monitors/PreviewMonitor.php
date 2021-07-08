<?php

namespace WPGatsby\ActionMonitor\Monitors;

use GraphQLRelay\Relay;
use WPGatsby\Admin\Preview;

class PreviewMonitor extends Monitor {
	public static $last_sent_modified_time_key = '_wpgatsby_last_preview_modified_time';

	function init() {
		$enable_gatsby_preview = Preview::get_setting('enable_gatsby_preview');

		if ($enable_gatsby_preview === 'on') {
			add_action( 'save_post', [ $this, 'post_to_preview_instance' ], 10, 2 );
		}
	}

	/**
	 * Get the Gatsby Preview instance refresh webhook
	 */
	static function get_gatsby_preview_webhook() {
		$preview_webhook = Preview::get_setting( 'preview_api_webhook' );

		if (
			! $preview_webhook ||
			! filter_var( $preview_webhook, FILTER_VALIDATE_URL )
		) {
			return false;
		}

		if ( substr( $preview_webhook, -1 ) !== '/' ) {
			$preview_webhook .= '/';
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

		$is_draft = $post->post_status === 'draft';

		$is_new_post_draft =
			(
				$post->post_status === 'auto-draft'
				|| $post->post_status === 'draft'
			) &&
			$post->post_date_gmt === '0000-00-00 00:00:00';

		$is_revision = $post->post_type === 'revision';
		$is_draft = $post->post_status === 'draft';

		if ( !$is_draft && !$is_revision && !$is_new_post_draft ) {
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
			// we will handle this in ActionMonitor.php, not here.
			return;
		}

		$parent_post_id = $original_post->ID ?? $post_ID;

		$post_type_object = $original_post
			? \get_post_type_object( $original_post->post_type )
			: \get_post_type_object( $post->post_type );

		if ( ! $post_type_object->show_in_graphql ?? true ) {
			// if the post type doesn't have show_in_graphql set,
			// we don't want to send a preview webhook for this post type.
			return;
		}

		$last_sent_modified_time = Preview::get_last_sent_modified_time_by_post_id(
			$parent_post_id
		);

		$last_sent_modified_time_unix = strtotime( $last_sent_modified_time );
		$this_sent_modified_time_unix = strtotime( $post->post_modified );

		$difference_between_last_modified_and_this_modified = 
			$this_sent_modified_time_unix - $last_sent_modified_time_unix;

		if (
			$last_sent_modified_time &&
			(
				// if the last time was the same as this.
				$last_sent_modified_time === $post->post_modified ||
				// or the last time was within the last 5 seconds.
				$difference_between_last_modified_and_this_modified < 5
			)
		) {
			// we've already sent a webhook for this revision.
			// return early to prevent extra builds.
			return;
		}

		// otherwise store this modified time so we can compare it next time.
		update_post_meta(
			$parent_post_id,
			self::$last_sent_modified_time_key,
			$post->post_modified
		);

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

		// this is used to optimistically load the preview iframe
		// we also check if the frontend is responding to requests from the
		// preview template JS.
		$webhook_success = Preview::was_request_successful( $response );

		update_option(
			'_wp_gatsby_preview_webhook_is_online',
			$webhook_success, // boolean.
			true
		);

		if ( ! $webhook_success ) {
			error_log(
				'WPGatsby couldn\'t reach the Preview webhook set in plugin options.'
			);
		}
	}
}
