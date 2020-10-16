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
        $enable_gatsby_locations = Settings::get_setting('enable_gatsby_locations') === 'on';

        if ( !$enable_gatsby_locations ) {
            return;
        }

        $gatsby_locations = apply_filters(
            'gatsby_locations',
            [
                'gatbsy-header-menu' => __( 'Header Menu [Added by WPGatsby]', 'WPGatsby' ),
                'gatbsy-footer-menu' => __( 'Footer Menu [Added by WPGatsby]', 'WPGatsby' ),
            ]
        );

        register_nav_menus( $gatsby_locations );
    }
}
