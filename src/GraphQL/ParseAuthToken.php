<?php

namespace WPGatsby\GraphQL;

use \Firebase\JWT\JWT;
use \WPGatsby\Admin\Settings;

class ParseAuthToken {
	function __construct() {
		add_action( 'init_graphql_request', [ $this, 'set_current_user' ] );
	}

	function set_current_user() {
		$jwt = $_SERVER['HTTP_WPGATSBYPREVIEW'] ?? null;
		
		if ( $jwt ) {
			$secret  = Settings::get_setting( 'preview_jwt_secret' );
			$decoded = JWT::decode( $jwt, $secret, [ 'HS256' ] );
			$decoded_user_id = $decoded->data->user_id ?? null;

			if ( ! $decoded || ! $decoded_user_id ) {
				return;
			}
			
			$jwt_is_for_existing_author = get_user_by(
				'id',
				$decoded_user_id
			);

			// we get the ID from a header so we can
			// process multiple user previews in a 
			// single Gatsby Preview process.
			$user_id = $_SERVER['HTTP_WPGATSBYPREVIEWUSER']
				// if it doesn't exist, try the user from the token
				?? $decoded_user_id
				?? null;

			if ( $user_id && $decoded && $jwt_is_for_existing_author ) {
				wp_set_current_user( $user_id );
			}
		}
	}

}
