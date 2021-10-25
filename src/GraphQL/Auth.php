<?php

namespace WPGatsby\GraphQL;

use \Firebase\JWT\JWT;
use \WPGatsby\Admin\Settings;

class Auth {
	static function get_token() {
		$site_url    = get_bloginfo( 'url' );
		$secret      = Settings::get_setting( 'preview_jwt_secret' );
		$now         = time();
		$expiry      = $now + 3600;
		$user_id     = get_current_user_id();

		$payload = [
			'iss'  => $site_url,
			'aud'  => $site_url,
			'iat'  => $now,
			'nbf'  => $now,
			'exp'  => $expiry,
			'data' => [
				'user_id' => $user_id,
			],
		];

		$jwt = JWT::encode( $payload, $secret );

		return $jwt;
	}
}
