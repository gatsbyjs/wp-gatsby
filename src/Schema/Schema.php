<?php

namespace WPGatsby\Schema;

/**
 * Modifies the schema
 */
class Schema {
	/**
	 *
	 */
	function __construct() {
		new SiteMeta();

		add_action('graphql_register_types', function() {

			register_graphql_object_type('WPGatsby', [
				'description' => __( 'WP-Gatsby related fields', 'WPGatsby' ),
				'fields' => [
					'isWPGatsby' => [
						'type' => 'Boolean',
						'description' => '',
						'resolve' => function() { return true; },
					],
				]
			]);

			register_graphql_field('RootQuery', 'wpGatsby', [
				'description' => '',
				'type' => 'WPGatsby',
				'resolve' => function() { return true; },
			]);

			$post_types = get_post_types([ 'show_in_graphql' => true ], 'objects');

			if (!empty($post_types)) {
				foreach($post_types as $post_type) {
					register_graphql_field(
						'WPGatsby',
						$post_type->graphql_single_name . 'IDs',
						[
							'type' => ['list_of' => 'Int'],
							'description' => '',
							'resolve' => function() use ($post_type) {
								$query = new \WP_Query([
									'post_type' => $post_type->name,
									'posts_per_page' => -1,
									'fields' => 'ids',
									'post_status' => 'publish',
									'no_found_rows' => true
								]);

								if (!empty($query->posts)) {
									return $query->posts;
								} else {
									return null;
								}
							}
						]
					);
				}
			}
		});
	}
}
