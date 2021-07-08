<?php
/**
 * Disable autoloading while running tests, as the test
 * suite already bootstraps the autoloader and creates
 * fatal errors when the autoloader is loaded twice
 */

if ( ! defined( 'GRAPHQL_DEBUG' ) ) {
	define( 'GRAPHQL_DEBUG', true );
}
