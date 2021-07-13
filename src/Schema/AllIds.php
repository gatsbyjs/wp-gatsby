<?php

namespace WPGatsby\AllIds;

class AllIds {
    function __construct() {
        add_action('graphql_register_types', function() {

            register_graphql_object_type('WpGatsbyIdAndType', [
				'description' => __( 'WP-Gatsby related fields', 'WPGatsby' ),
				'fields' => [
					'ids' => [
						'type' => [ 'list_of' => 'Int' ],
                    ],
                    'type' => [
                        'type' => 'String'
                    ]
				]
			]);

            register_graphql_field(
                'WPGatsby',
                'allIDs',
                [
                    'type' => ['list_of' => 'WpGatsbyIdAndType'],
                    'description' => '',
                    'resolve' => function() {
                        $node_ids_by_type = [];

                        // 
                        // Get all taxonomy term id's
                        $taxonomies = get_taxonomies( [ 'show_in_graphql' => true ], OBJECT );

                        if ( is_array( $taxonomies ) && ! empty( $taxonomies ) ) {
                            foreach ( $taxonomies as $taxonomy ) {
                                $term_ids = get_terms( $taxonomy->name, [ 'hide_empty' => false, 'fields' => 'ids' ] );
                                $taxonomy_type_name = ucfirst( $taxonomy->graphql_single_name );

                                if (array_key_exists($taxonomy_type_name, $node_ids_by_type)) {
                                    $node_ids_by_type[$taxonomy_type_name] = array_merge($node_ids_by_type[$taxonomy_type_name], $term_ids);
                                } else {
                                    $node_ids_by_type[$taxonomy_type_name] = $term_ids;
                                }
                            }
                        }
                        // 


                        // // 
                        // // Get all Menu id's
                        // $menu_ids = get_terms( [
                        //     'taxonomy' => 'nav_menu',
                        //     'hide_empty' => false,
                        //     'fields' => 'ids'
                        // ] );

                        // $node_ids_by_type['Menu'] = $menu_ids;
                        // // 

                        // // 
                        // // Get all Menu item id's
                        // $menu_items_query = new \WP_Query([
                        //     'post_type' => 'nav_menu_item',
                        //     'posts_per_page' => -1,
                        //     'fields' => 'ids',
                        //     'no_found_rows' => true,
                        // ]);

                        // $menu_item_ids = $menu_items_query->posts;

                        // $node_ids_by_type['MenuItem'] = $menu_item_ids;
                        // // 

                        // 
                        // Get all Comment id's
                        $comment_ids = get_comments( [
                            'hierarchical' => 'flat',
                            'post_type' => 'any',
                            'fields' => 'ids'
                        ] );

                        $node_ids_by_type['Comment'] = $comment_ids;
                        // 


                        // 
                        // Get all User id's
                        $user_ids = get_users( [
                            'fields' => 'ids',
                            'has_published_posts' => true,
                            'number' => -1
                        ] );

                        $node_ids_by_type['User'] = $user_ids;
                        // 

                        // 
                        // Get all post id's
                        $post_types = get_post_types([ 'show_in_graphql' => true ], 'objects');


                        foreach($post_types as $post_type) {
                            if ($post_type->name === 'action_monitor' || $post_type->name === 'attachment') {
                                continue;
                            }

                            $query = new \WP_Query([
                                'post_type' => $post_type->name,
                                'posts_per_page' => -1,
                                'fields' => 'ids',
                                'post_status' => 'publish',
                                'no_found_rows' => true
                            ]);
    
                            $post_type_typename = ucfirst(
                                $post_type->graphql_single_name 
                            );

                            $post_type_ids = $query->posts;
                            $node_ids_by_type[$post_type_typename] = $post_type_ids;
                        }
                        // 

                        $format_response = function($typename, $ids) {
                            return [
                                'type' => $typename,
                                'ids' => $ids
                            ];
                        };

                        return array_map($format_response, array_keys($node_ids_by_type), $node_ids_by_type);
                    }
                ]
            );
		});
    }
}