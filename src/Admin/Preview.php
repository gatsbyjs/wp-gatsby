<?php

namespace WPGatsby\Admin;

use WPGraphQL\Router;
use WPGatsby\Admin\Settings;

class Preview {
	public static $last_sent_modified_time_key = '_wpgatsby_last_preview_modified_time';

	public function __construct() {
		$enable_gatsby_preview = Settings::get_setting('enable_gatsby_preview');

		if ($enable_gatsby_preview === 'on') {
			add_filter( 'template_include', [ $this, 'setup_preview_template' ], 1, 99 );
		}
	}

	public function setup_preview_template( $template ) {
		global $post;

		$post_type = $post->post_type ?? null;

        $post_type_object = get_post_type_object( $post->post_type ) ?? null;
        
        $admin_includes_directory = plugin_dir_path( __FILE__ ) . 'includes/';

		if ( $post_type && !$post_type_object->show_in_graphql ?? true ) {
			return $admin_includes_directory . 'post-type-not-shown-in-graphql.php';
		}

		$is_preview  = is_preview();
		$preview_url = Settings::get_gatsby_preview_instance_url();

		if ( $is_preview && $preview_url ) {
			return $admin_includes_directory . 'preview-template.php';
		} elseif ( $is_preview && ! $preview_url ) {
			return $admin_includes_directory . 'no-preview-url-set.php';
		}

		return $template;
	}

	public static function printInitialPreviewTemplateStateJS() {
		global $post;
		$post_id  = $post->ID;

		$preview_url  = Settings::get_gatsby_preview_instance_url();
		$preview_url  = rtrim( $preview_url, '/' );

		$preview_webhook_online = get_option(
			'_wp_gatsby_preview_webhook_is_online'
		);

		$initial_state = json_encode([
			'postId' =>  $post_id,
			'previewFrontendUrl' => $preview_url,
			'previewWebhookIsOnline' =>  $preview_webhook_online,
			'graphqlEndpoint' => Router::$route,
			'webhookWasCalled' => self::wasPreviewWebhookCalledForPostId(
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

	/**
	 * This is used to print out the client JS file directly to the
	 * Preview template html
	 */
	public static function printFileContents( $fileName ) {
		$pluginDirectory = plugin_dir_path( __FILE__ );
		$filePath = $pluginDirectory . $fileName;
		echo file_get_contents( $filePath );
	}
}
