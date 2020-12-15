<?php

namespace WPGatsby\Schema;

/**
 * Modifies WPGraphQL built-in types
 */
class WPGatsbyWPGraphQLSchemaChanges {
	function __construct() {
		add_action(
			'graphql_register_types',
			function() {
				$this->register();
			}
		);
	}

	function register() {
		register_graphql_field(
			'ContentType',
			'archivePath',
			[
				'type'        => 'String',
				'description' => __( 'The url path of the first page of the archive page for this content type.', 'wp-gatsby' ),
				'resolve'     => function( $source, $args, $context, $info ) {
					$archive_link = get_post_type_archive_link( $source->name );

					if ( empty( $archive_link ) ) {
						return null;
					}

					$site_url = get_site_url();

					$archive_path = str_replace( $site_url, '', $archive_link );

					if ( $archive_link === $site_url && $archive_path === '' ) {
						return '/';
					}

					return $archive_path ?? null;
				},
			]
		);

		register_graphql_field(
			'Taxonomy',
			'archivePath',
			[
				'type'        => 'String',
				'description' => __( 'The url path of the first page of the archive page for this content type.', 'wp-gatsby' ),
				'resolve'     => function( $source, $args, $context, $info ) {
					$tax = get_taxonomy( $source->name );

					if ( ! $tax->rewrite['slug'] ?? false ) {
						return null;
					}

					return '/' . $tax->rewrite['slug'] . '/';
				},
			]
		);
	}
}
