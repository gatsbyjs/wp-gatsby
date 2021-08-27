<?php

namespace WPGatsby\Admin;

use GraphQL\Error\UserError;
use WPGraphQL\Router;

class Preview {

	public static $last_sent_modified_time_key = '_wpgatsby_last_preview_modified_time';

	function __construct() {}

	public static function get_gatsby_content_sync_url_for_post( $post ) {
		// get the Gatsby Cloud loader url w/ site id
		$gatsby_content_sync_url = self::get_setting( 'gatsby_content_sync_url' );
					
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

	public static function getPreviewablePostObjectByPostId( $post_id ) {
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
		$revision = self::getPreviewablePostObjectByPostId( $post->ID );
		$revision_modified = $revision->post_modified ?? null;

		if ( !$revision_modified || $revision_modified === "" ) {
			return null;
		}

		$manifest_id = $post->ID . $revision_modified;

		return $manifest_id;
	}

	public static function get_last_sent_modified_time_by_post_id( $post_id ) {
		return get_post_meta(
			$post_id,
			self::$last_sent_modified_time_key,
			true
		);
	}

	public static function was_preview_webhook_called_for_post_id( $post_id ) {
		$revision = Preview::getPreviewablePostObjectByPostId( $post_id );

		$revision_modified = $revision->post_modified ?? null;

		$last_sent_modified_time = self::get_last_sent_modified_time_by_post_id(
			$post_id
		);

		return $revision_modified === $last_sent_modified_time;
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
}
