<?php

namespace WPGatsby\ThemeSupport;

use WPGatsby\Admin\Settings;

/**
 * Modifies the schema
 */
class ThemeSupport {
	/**
	 *
	 */
	function __construct() {
		add_action( 'init', [ $this, 'registerGatsbyMenuLocations' ] );
	}

	function registerGatsbyMenuLocations() {
		$enable_gatsby_locations = 'on' === Settings::get_setting( 'enable_gatsby_locations' );

		if ( ! $enable_gatsby_locations ) {
			return;
		}

		$gatsby_locations = apply_filters(
			'gatsby_locations',
			[
				'gatsby-header-menu' => __( 'Header Menu [Added by WPGatsby]', 'WPGatsby' ),
				'gatsby-footer-menu' => __( 'Footer Menu [Added by WPGatsby]', 'WPGatsby' ),
			]
		);

		register_nav_menus( $gatsby_locations );
	}
}
