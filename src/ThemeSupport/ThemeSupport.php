<?php

namespace WPGatsby\ThemeSupport;

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
        register_nav_menus(
            [
                'gatbsy-header-menu' => __( 'Header Menu [Gatsby]', 'WPGatsby' ),
                'gatbsy-header-menu-secondary' => __( 'Secondary Header Menu [Gatsby]', 'WPGatsby' ),
                'gatbsy-header-menu-tertiary' => __( 'Tertiary Header Menu [Gatsby]', 'WPGatsby' ),
                'gatbsy-footer-menu' => __( 'Footer Menu [Gatsby]', 'WPGatsby' ),
                'gatbsy-footer-menu-secondary' => __( 'Secondary Footer Menu [Gatsby]', 'WPGatsby' ),
                'gatbsy-footer-menu-tertiary' => __( 'Tertiary Footer Menu [Gatsby]', 'WPGatsby' ),
            ]
        );
    }
}
