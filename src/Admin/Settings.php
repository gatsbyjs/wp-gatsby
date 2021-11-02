<?php

namespace WPGatsby\Admin;

class Settings {

	private $settings_api;

	function __construct() {

		$this->settings_api = new \WPGraphQL_Settings_API;

		add_action( 'init', [ $this, 'set_default_jwt_key' ] );
		add_action( 'admin_init', [ $this, 'admin_init' ] );
		add_action( 'admin_menu', [ $this, 'register_settings_page' ] );

		// Filter the GraphQL Settings for introspection to force enable Introspection when WPGatsby is active
		add_filter( 'graphql_setting_field_config', [ $this, 'filter_graphql_introspection_setting_field' ], 10, 3 );
		add_filter( 'graphql_get_setting_section_field_value', [ $this, 'filter_graphql_introspection_setting_value' ], 10, 5 );
	}

	/**
	 * If the settings haven't been saved yet, save the JWT once to prevent it from re-generating.
	 */
	public function set_default_jwt_key() {	
		// Get the JWT Secret
		$default_secret = self::get_setting( 'preview_jwt_secret' );

		if ( empty( $default_secret ) ) {

			// Get the WPGatsby Settings from the options
			$options = get_option( 'wpgatsby_settings', [] );

			// If settings haven't been saved before, instantiate them as a new array
			if ( empty( $options ) || ! is_array( $options ) ) {
				$options = [];
			}

			// Se the preview secret
			$options['preview_jwt_secret'] = self::generate_secret();

			// Save the settings to prevent the JWT Secret from generating again
			update_option( 'wpgatsby_settings', $options );
		}
	}

	/**
	 * Overrides the "public_introspection_enabled" setting field in the GraphQL Settings to be
	 * checked and disabled so users can't uncheck it.
	 *
	 * @param array  $field_config The field config for the setting
	 * @param string $field_name   The name of the field (unfilterable in the config)
	 * @param string $section      The slug of the section the field is registered to
	 *
	 * @return mixed
	 */
	public function filter_graphql_introspection_setting_field( $field_config, $field_name, $section ) {
		if ( 'graphql_general_settings' === $section && 'public_introspection_enabled' === $field_name ) {
			$field_config['value']    = 'on';
			$field_config['disabled'] = true;
			$field_config['desc']     = $field_config['desc'] . ' (<strong>' . __( 'Force enabled by WPGatsby. Gatsby requires WPGraphQL introspection to communicate with WordPress.', 'WPGatsby' ) . '</strong>)';
		}

		return $field_config;
	}

	/**
	 * Filters the value of the "public_introspection_enabled" setting to always be "on" when
	 * WPGatsby is enabled
	 *
	 * @param mixed  $value          The value of the field
	 * @param mixed  $default        The default value if there is no value set
	 * @param string $field_name     The name of the option
	 * @param array  $section_fields The setting values within the section
	 * @param string $section_name   The name of the section the setting belongs to
	 *
	 * @return string
	 */
	public function filter_graphql_introspection_setting_value( $value, $default, $field_name, $section_fields, $section_name ) {
		if ( 'graphql_general_settings' === $section_name && 'public_introspection_enabled' === $field_name ) {
			return 'on';
		}

		return $value;
	}

	function admin_init() {
		//set the settings
		$this->settings_api->set_sections( $this->get_settings_sections() );
		$this->settings_api->set_fields( $this->get_settings_fields() );

		//initialize settings
		$this->settings_api->admin_init();
	}

	function admin_menu() {
		add_options_page(
			'Settings API',
			'Settings API',
			'delete_posts',
			'settings_api_test',
			[
				$this,
				'plugin_page',
			]
		);
	}


	function get_settings_sections() {
		$sections = [
			[
				'id'    => 'wpgatsby_settings',
				'title' => __( 'Settings', 'wpgatsby_settings' ),
			],
		];

		return $sections;
	}

	public function register_settings_page() {
		add_options_page(
			'Gatsby',
			'GatsbyJS',
			'manage_options',
			'gatsbyjs',
			[
				$this,
				'plugin_page',
			]
		);
	}


	function plugin_page() {
		echo '<div class="wrap">';
		echo '<div class="notice-info notice">
			<p>
				<a target="_blank" href="'
					. esc_url( 'https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/docs/tutorials/configuring-wp-gatsby.md' ) . '">
					Learn how to configure WPGatsby here 
					.
				</a>
			</p>
		</div>';
		$this->settings_api->show_navigation();
		$this->settings_api->show_forms();
		echo '</div>';
	}

	static public function prefix_get_option( $option, $section, $default = '' ) {
		$options = get_option( $section );

		if ( isset( $options[ $option ] ) ) {
			return $options[ $option ];
		}

		return $default;
	}

	private static function generate_secret() {
		$factory   = new \RandomLib\Factory;
		$generator = $factory->getMediumStrengthGenerator();
		$secret    = $generator->generateString( 50 );

		return $secret;
	}

	private static function get_default_secret() {
		$default_secret = self::get_setting( 'preview_jwt_secret' );

		if ( ! $default_secret ) {
			$default_secret = self::generate_secret();
		}

		return $default_secret;
	}

	public static function sanitize_url_field( $input ) {
		$urls = explode( ',', $input );
		if ( count( $urls ) > 1 ) {

			// validate all urls
			$validated_urls = array_map(
				function ( $url ) {
					return filter_var( $url, FILTER_VALIDATE_URL );
				},
				$urls
			);

			// then put em back together
			return implode( ',', $validated_urls );
		}

		return filter_var( $input, FILTER_VALIDATE_URL );
	}

	public static function get_setting( $key ) {
		$wpgatsby_settings = get_option( 'wpgatsby_settings' );

		return $wpgatsby_settings[ $key ] ?? null;
	}

	/**
	 * Returns all the settings fields
	 *
	 * @return array settings fields
	 */
	function get_settings_fields() {
		$settings_fields = [
			'wpgatsby_settings' => [
				[
					'name'  => 'enable_gatsby_preview',
					'label' => __( 'Enable Gatsby Preview?', 'wpgatsby_settings' ),
					'desc'  => __( 'Yes, allow Gatsby to take over WordPress previews.', 'wpgatsby_settings' ),
					'type'  => 'checkbox',
				],
				[
					'name'              => 'preview_api_webhook',
					'label'             => __( 'Preview Webhook URL', 'wpgatsby_settings' ),
					'desc'              => __( 'Use a comma-separated list to configure multiple webhooks.', 'wpgatsby_settings' ),
					'placeholder'       => __( 'https://', 'wpgatsby_settings' ),
					'type'              => 'text',
					'sanitize_callback' => function ( $input ) {
						return $this->sanitize_url_field( $input );
					},
				],
				[
					'name'              => 'builds_api_webhook',
					'label'             => __( 'Builds Webhook URL', 'wpgatsby_settings' ),
					'desc'              => __( 'Use a comma-separated list to configure multiple webhooks.', 'wpgatsby_settings' ),
					'placeholder'       => __( 'https://', 'wpgatsby_settings' ),
					'type'              => 'text',
					'sanitize_callback' => function ( $input ) {
						return $this->sanitize_url_field( $input );
					},
				],
				[
					'name'              => 'gatsby_content_sync_url',
					'label'             => __( 'Gatsby Content Sync URL', 'wpgatsby_settings' ),
					'desc'              => __( 'Find this URL in your Gatsbyjs.com dashboard settings.', 'wpgatsby_settings' ), 
					'placeholder'       => __( 'https://', 'wpgatsby_settings' ),
					'type'              => 'text',
					'sanitize_callback' => function ( $input ) {
						return $this->sanitize_url_field( $input );
					},
				],
				[
					'name'              => 'preview_jwt_secret',
					'label'             => __( 'Preview JWT Secret', 'wpgatsby_settings' ),
					'desc'              => __( 'This secret is used in the encoding and decoding of the JWT token. If the Secret were ever changed on the server, ALL tokens that were generated with the previous Secret would become invalid. So, if you wanted to invalidate all user tokens, you can change the Secret on the server and all previously issued tokens would become invalid and require users to re-authenticate.', 'wpgatsby_settings' ),
					'type'              => 'password',
					'sanitize_callback' => 'sanitize_text_field',
					'default'           => self::get_default_secret(),
				],
				[
					'name'    => 'enable_gatsby_locations',
					'label'   => __( 'Enable Gatsby Menu Locations?', 'wpgatsby_settings' ),
					'desc'    => __( 'Yes', 'wpgatsby_settings' ),
					'type'    => 'checkbox',
					'default' => 'on',
				],
			],
		];

		return $settings_fields;
	}
}
