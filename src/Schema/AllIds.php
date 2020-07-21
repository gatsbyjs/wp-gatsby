<?php

namespace WPGatsby\AllIds;

use GraphQLRelay\Relay;

class AllIds {
    function __construct() {
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

            register_graphql_object_type('WpGatsbyIdAndType', [
				'description' => __( 'WP-Gatsby related fields', 'WPGatsby' ),
				'fields' => [
					'id' => [
						'type' => 'ID',
                    ],
                    'type' => [
                        'type' => 'String'
                    ]
				]
			]);

			register_graphql_field('RootQuery', 'wpGatsby', [
				'description' => '',
				'type' => 'WPGatsby',
				'resolve' => function() { return true; },
            ]);      

            register_graphql_field(
                'WPGatsby',
                'allIDs',
                [
                    'type' => ['list_of' => 'WpGatsbyIdAndType'],
                    'description' => '',
                    'resolve' => function() {
                        $nodes = [];

                        $taxonomies = get_taxonomies( [ 'show_in_graphql' => true ], OBJECT );

                        if ( is_array( $taxonomies ) && ! empty( $taxonomies ) ) {
                            foreach ( $taxonomies as $taxonomy ) {
                                $nodes = array_merge(
                                    $nodes,
                                    [[
                                        'id' => base64_encode( 'taxonomy:' . $taxonomy->name ),
                                        'type' => 'Taxonomy'
                                    ]],
                                );

                                $terms = get_terms( $taxonomy->name, [ 'hide_empty' => false, 'fields' => 'ids' ] );

                                $terms_normalized = array_map(
                                    function ( $term_id ) use ($taxonomy) {
                                        return [
                                            'id' => base64_encode( 'term:' . $term_id ),
                                            'type' => ucfirst( $taxonomy->graphql_single_name )
                                        ];
                                    },
                                    $terms
                                );

                                $nodes = array_merge(
                                    $nodes,
                                    $terms_normalized
                                );
                            }
                        }

                        $menu_ids = get_terms( [
                            'taxonomy' => 'nav_menu',
                            'hide_empty' => false,
                            'fields' => 'ids'
                        ] );

                        $normalized_menus = array_map(
                            function($menu_id) {
                                return [
                                    'id' => base64_encode( 'term:' . $menu_id ),
                                    'type' => 'Menu'
                                ];
                            },
                            $menu_ids
                        );

                        $nodes = array_merge(
                            $nodes,
                            $normalized_menus
                        );

                        $menu_items_query = new \WP_Query([
                            'post_type' => 'nav_menu_item',
                            'posts_per_page' => -1,
                            'fields' => 'ids',
                            'no_found_rows' => true,
                        ]);

                        if ( !empty( $menu_items_query->posts ) ) {
                            $formatted_menu_items = array_map(
                                function($post_id) {
                                    return [ 
                                        'id' => Relay::toGlobalId(
                                            'nav_menu_item',
                                            absint( $post_id )
                                        ),
                                        'type' => 'MenuItem',
                                    ];
                                },
                                $menu_items_query->posts
                            );

                            $nodes = array_merge(  $nodes, $formatted_menu_items );   
                        }

                        $comments = get_comments( [
                            'hierarchical' => 'flat',
                            'post_type' => 'any'
                        ] );

                        if ( !empty( $comments ) ) {
                            $formatted_comments = array_map(
                                function($comment) {
                                    error_log(print_r($comment, true)); 
                                    return [ 
                                        'id' => Relay::toGlobalId(
                                            'comment',
                                            absint( $comment->comment_ID )
                                        ),
                                        'type' => 'Comment',
                                    ];
                                },
                                $comments
                            );

                            $nodes = array_merge(  $nodes, $formatted_comments );   
                        }

                        $users = get_users( [
                            'fields' => 'ids',
                            'has_published_posts' => true,
                            'number' => -1
                        ] );

                        $users_normalized = array_map(
                            function($user_id) {
                                return [
                                    'id' => Relay::toGlobalId(
                                        'user',
                                        absint( $user_id )
                                    ),
                                    'type' => 'User',
                                ];
                            },
                            $users
                        );

                        $nodes = array_merge(
                            $nodes,
                            $users_normalized,
                        );

                        $post_types = get_post_types([ 'show_in_graphql' => true ], 'objects');


                        foreach($post_types as $post_type) {
                            if ($post_type->name === 'action_monitor') {
                                continue;
                            }

                            array_push(
                                $nodes,
                                [
                                    'id' => Relay::toGlobalId(
                                        'post_type',
                                        $post_type->name,
                                    ),
                                    'type' => 'ContentType'
                                ]
                            );

                            $query = new \WP_Query([
                                'post_type' => $post_type->name,
                                'posts_per_page' => -1,
                                'fields' => 'ids',
                                'post_status' => 'publish',
                                'no_found_rows' => true
                            ]);
    
                            if ( !empty( $query->posts ) ) {
                                $formatted_posts = array_map(
                                    function($post_id) use($post_type) {
                                        return [ 
                                            'id' => Relay::toGlobalId(
                                                'post',
                                                absint( $post_id )
                                            ),
                                            'type' => ucfirst(
                                                $post_type->graphql_single_name 
                                            ),
                                        ];
                                    },
                                    $query->posts
                                );

                                $nodes = array_merge(  $nodes, $formatted_posts );   
                            }
                        }

                        return $nodes;
                    }
                ]
            );
		});
    }
}