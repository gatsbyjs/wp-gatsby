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
                'gatbsy-header-menu' => __( 'Header Menu [Gatsby]' ),
                'gatbsy-header-menu-secondary' => __( 'Secondary Header Menu [Gatsby]' ),
                'gatbsy-header-menu-quaternary' => __( 'Quaternary Header Menu [Gatsby]' ),
                'gatbsy-footer-menu' => __( 'Footer Menu [Gatsby]' ),
                'gatbsy-footer-menu-secondary' => __( 'Secondary Footer Menu [Gatsby]' ),
                'gatbsy-footer-menu-quaternary' => __( 'Quaternary Footer Menu [Gatsby]' ),
            ]
        );
    }
}
