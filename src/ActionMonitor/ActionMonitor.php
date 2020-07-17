<?php

namespace WPGatsby\ActionMonitor;

use WPGatsby\Admin\Settings;
use GraphQLRelay\Relay;

/**
 * This class registers and controls a post type which can be used to
 * monitor WP events like post save or delete in order to invalidate
 * Gatsby's cached nodes
 */
class ActionMonitor {

	/**
	 * Whether a build hook should be dispatched. Default false.
	 *
	 * @var bool
	 */
	protected $should_dispatch = false;

	/**
	 * An array of posts ID's for posts that have been updated
	 * in this ActionMonitor instantiation
	 */
	protected $updated_post_ids = [];

	/**
	 * Set up the Action monitor when the class is initialized
	 */
	function __construct() {
		add_action(
			'init',
			function() {
				$this->initPostType();
			}
		);

		add_action( 'shutdown', [ $this, 'trigger_dispatch' ] );

		$this->registerGraphQLFields();
		$this->monitorActions();
	}

	function garbageCollectActions() {
		$posts = get_posts( [
			'numberposts' => - 1,
			'post_type'   => 'action_monitor',
			'date_query'  => [
				'before' => date( "Y-m-d H:i:s", strtotime( '-7 days' ) ),
			],
		] );

		if ( ! empty( $posts ) ) {
			foreach ( $posts as $post ) {
				wp_delete_post( $post->ID );
			}
		}
	}

	// $args = [$action_type, $title, $status, $node_id, $relay_id, $graphql_single_name, $graphql_plural_name]
	function insertNewAction( $args ) {
		if (
			! $args['action_type'] ||
			! $args['title'] ||
			! $args['node_id'] ||
			! $args['relay_id'] ||
			! $args['graphql_single_name'] ||
			! $args['graphql_plural_name']
		) {
			// @todo log that this action isn't working??
			return;
		}

		$time = time();

		$action_monitor_post_id = \wp_insert_post(
			[
				'post_title'  => $args['title'],
				'post_type'   => 'action_monitor',
				'post_status' => 'private',
				'author'      => - 1,
				'post_name'   => sanitize_title( "{$args['title']}-{$time}" )
			]
		);

		if ( $action_monitor_post_id !== 0 ) {
			\update_post_meta(
				$action_monitor_post_id,
				'action_type',
				$args['action_type']
			);
			\update_post_meta(
				$action_monitor_post_id,
				'referenced_node_status',
				$args['status'] // menus don't have post status. This is for Gatsby
			);
			\update_post_meta(
				$action_monitor_post_id,
				'referenced_node_id',
				$args['node_id']
			);
			\update_post_meta(
				$action_monitor_post_id,
				'referenced_node_relay_id',
				$args['relay_id']
			);
			\update_post_meta(
				$action_monitor_post_id,
				'referenced_node_single_name',
				graphql_format_field_name( $args['graphql_single_name'] )
			);
			\update_post_meta(
				$action_monitor_post_id,
				'referenced_node_plural_name',
				graphql_format_field_name( $args['graphql_plural_name'] )
			);

			if ( $args['post_modified'] ?? null ) {
				\update_post_meta(
					$action_monitor_post_id,
					'referenced_node_post_modified',
					$args['post_modified']
				);
			}

			\wp_update_post( [
				'ID'          => $action_monitor_post_id,
				'post_status' => 'publish'
			] );
		}

		// we've saved at least 1 action, so we should update
		$this->should_dispatch = true;

		$this->garbageCollectActions();
	}

	/**
	 * Use WP Action hooks to create action monitor posts
	 */
	function monitorActions() {
		// Post / Page actions
		add_action( 'save_post', function( $post_id, $post ) {

			$this->savePost( $post_id );

		}, 1, 2 );

		add_action( 'pre_post_update', [ $this, 'preSavePost' ], 10, 2 );

		// Menu actions
		add_action( 'wp_update_nav_menu', function( $menu_id ) {
			$this->saveMenu( $menu_id, 'UPDATE' );
		} );

		add_action( 'wp_create_nav_menu', function( $menu_id ) {
			$this->saveMenu( $menu_id, 'CREATE' );
		} );

		add_action( 'wp_delete_nav_menu', [ $this, 'deleteMenu' ], 10, 1 );

		// Media item actions
		add_action( 'add_attachment', [ $this, 'saveMediaItem' ], 10, 1 );

		add_filter( 'wp_save_image_editor_file', [ $this, 'updateMediaItem' ], 10, 5 );

		add_action( 'delete_attachment', [ $this, 'deleteMediaItem' ], 10, 1 );

		// Taxonomy / term actions
		add_action( 'created_term', function( $term_id, $tt_id, $taxonomy ) {
			$this->saveTerm( $term_id, $taxonomy, 'CREATE' );
		}, 10, 3 );

		add_action( 'edited_terms', function( $term_id, $taxonomy ) {
			$this->saveTerm( $term_id, $taxonomy, 'UPDATE' );
		}, 10, 2 );

		add_action( 'delete_term', [ $this, 'deleteTerm' ], 10, 5 );

		// User actions
		add_action( 'save_post', [ $this, 'updateUserIsPublic' ], 10, 2 );

		add_action( 'profile_update', [ $this, 'updateUser' ], 10 );

		add_action( 'delete_user', [ $this, 'deleteUser' ], 10, 2 );

		// Post meta updates
		$meta_types = [ 'user', 'post', 'page' ];

		foreach ( $meta_types as $type ) {
			add_action( "updated_{$type}_meta", [ $this, 'modifyMeta' ], 100, 3 );
			add_action( "added_{$type}_meta", [ $this, 'modifyMeta' ], 100, 3 );
			add_action( "deleted_{$type}_meta", [ $this, 'modifyMeta' ], 100, 3 );
		}

	}

	function modifyMeta( $meta_id, $object_id, $meta_key ) {
		if ( $meta_key === '_edit_lock' ) {
			return;
		}

		if ( get_post_type( $object_id ) === 'action_monitor' ) {
			return;
		}

		if ( ! get_post_type( $object_id ) && get_userdata( $object_id ) ) {
			$this->updateUser( $object_id, 'UPDATE' );
			return;
		}

		$this->savePost( $object_id );
	}

	function deleteUser( $user_id, $reassigned_user_id ) {
		$this->updateUser( $user_id, 'DELETE', 'private ' );

		if ( $reassigned_user_id ) {
			// get all their posts that are
			// available in wpgraphql and update each of them
			$post_types = get_post_types( [ 'show_in_graphql' => true ] );

			foreach ( $post_types as $post_type ) {
				$query = new \WP_Query( [
					'post_type'      => $post_type,
					'author'         => $user_id,
					'posts_per_page' => - 1
					// @todo this is a big no-no. Could break a large site. In Gatsby we should store potential 2 way connections and if there is a 2 way connection and a post is updated, check its child nodes for 2 way connections. For any 2 way connections check if this node is a child of that node. If it's not then refetch that node as well.
				] );

				if ( $query->have_posts() ) {
					while ( $query->have_posts() ) {
						$query->the_post();
						$post = get_post();
						$this->savePost( $post->ID, $post );
					}

					wp_reset_postdata();
				}
			}

			$this->updateUser( $reassigned_user_id, 'UPDATE', 'publish' );
		}
	}

	function updateUser( $user_id, $action_type = 'UPDATE', $status = 'publish' ) {
		$user_data = \get_userdata( $user_id );

		$user_was_public = \get_user_meta( $user_id, 'gatsby_user_is_public', true );

		if ( ! $user_was_public ) {
			$user_is_public = $this->checkIfUserIsPublic( $user_id );

			if ( ! $user_is_public ) {
				return;
			}
		}

		$relay_id = $relay_id = Relay::toGlobalId( 'user', $user_id );

		$this->insertNewAction( [
			'action_type'         => $action_type,
			'title'               => $user_data->data->user_nicename,
			'status'              => $status,
			'node_id'             => $user_id,
			'relay_id'            => $relay_id,
			'graphql_single_name' => 'user',
			'graphql_plural_name' => 'users',
		] );
	}

	function checkIfUserIsPublic( $user_id ) {
		if ( ! $user_id ) {
			// @todo error or log here?
			return;
		}

		$post_types = get_post_types( [ 'show_in_graphql' => true ] );

		$user_is_public = false;

		foreach ( $post_types as $post_type ) {
			// action monitor doesn't count
			if ( $post_type === 'action_monitor' ) {
				continue;
			}

			$post_type_post_count = count_user_posts( $user_id, $post_type, true );
			if ( $post_type_post_count > 0 ) {
				// this user has public posts so they are public too
				$user_is_public = true;
				break;
			}
		}

		return $user_is_public;
	}

	function updateUserIsPublic( $post_id, $post ) {
		if ( ! $this->savePostGuardClauses( $post ) ) {
			return;
		}

		$current_user = wp_get_current_user() ?? null;
		$user_id      = $current_user->ID ?? null;

		if ( ! $user_id ) {
			return;
		}

		$user_is_public  = $this->checkIfUserIsPublic( $user_id );
		$user_was_public = \get_user_meta( $user_id, 'gatsby_user_is_public', true );

		if (
			( $user_is_public && $user_was_public ) ||
			( ! $user_is_public && ! $user_was_public ) ||
			$user_is_public === $user_was_public
		) {
			// no change in privacy has happened. Do nothing
			return;
		}

		// else a change in privacy has happened.
		// we need to record that in WP and Gatsby

		\update_user_meta( $user_id, 'gatsby_user_is_public', $user_is_public );

		$title = $user_is_public && isset( $current_user->data->user_nicename )
			? $current_user->data->user_nicename
			: "User";

		$relay_id = Relay::toGlobalId( 'user', $user_id );

		$this->insertNewAction( [
			'action_type'         => $user_is_public ? 'CREATE' : 'DELETE',
			'title'               => $title,
			'status'              => $user_is_public ? 'publish' : 'private',
			'node_id'             => $user_id,
			'relay_id'            => $relay_id,
			'graphql_single_name' => 'user',
			'graphql_plural_name' => 'users',
		] );
	}

	function getTermInfo( $term_id, $taxonomy, $deleted_term = null ) {
		$global_relay_id = Relay::toGlobalId(
			'term',
			$term_id
		);

		$taxonomy_object = get_taxonomy( $taxonomy );

		if ( ! $taxonomy_object ) {
			return null;
		}

		$graphql_single_name = $taxonomy_object->graphql_single_name ?? null;
		$graphql_plural_name = $taxonomy_object->graphql_plural_name ?? null;

		if ( ! $graphql_plural_name || ! $graphql_single_name ) {
			return null;
		}

		if ( $deleted_term ) {
			$term = $deleted_term;
		} else {
			$term = get_term( $term_id, $taxonomy );
		}

		if ( ! $term ) {
			return null;
		}

		$term_info = [
			'global_relay_id'     => $global_relay_id,
			'taxonomy_object'     => $taxonomy_object,
			'graphql_single_name' => $graphql_single_name,
			'graphql_plural_name' => $graphql_plural_name,
			'term'                => $term,
		];

		return $term_info;
  }

  function isTermPrivate( $taxonomy_object ) {
    // if the terms tax is not public, don't monitor it
    if ( $taxonomy_object->public ?? null ) {
      return false;
    }

    // if the terms tax isn't shown in graphql, don't monitor it
    if ( $taxonomy_object->show_in_graphql ?? null ) {
      return false;
    }

    return true;
  }

  function getTermParent( $term_info ) {
    $taxonomy_object = $term_info['taxonomy_object'] ?? null;

    // if the tax isn't hierarchical we can duck out here
    if ( ! $taxonomy_object->hierarchical ?? null ) {
      return false;
    }

    $term_parent_id = $term_info['term']->parent ?? null;

    return $term_parent_id;
  }

  function getTermChildren( $term_info ) {
    $taxonomy_object = $term_info['taxonomy_object'] ?? null;

    // if the tax isn't hierarchical we can duck out here
    if ( ! $taxonomy_object->hierarchical ?? null ) {
      return false;
    }

    $term = $term_info['term'] ?? null;
    $term_id = $term->term_id ?? null;

    if ( ! $term_id ) {
      return null;
    }

    $term_children = get_terms( [
      'parent' => $term_id,
      'taxonomy' => $taxonomy_object->name ?? null,
      'hide_empty' => false
    ] );

    return $term_children;
  }

  function saveChildTerms( $term_info, $taxonomy, $action_type ) {
    $child_terms = $this->getTermChildren( $term_info );

    if ( $child_terms && count( $child_terms ) ) {
      foreach ( $child_terms as $term ) {
        if ( $term->term_id ?? null ) {
          $this->saveTerm( $term->term_id, $taxonomy, $action_type, 'DOWN' );
        }
      }
    }
  }

  function saveTermRelatives( $term_info, $taxonomy, $action_type, $recursing ) {
    if ( $recursing ) {
      return;
    }

    $term_parent_id = $this->getTermParent( $term_info );

    if ( $term_parent_id ) {
      // re-save the parent to make sure the cache is in sync
      $this->saveTerm( $term_parent_id, $taxonomy, $action_type, 'UP' );
    }

    // re-save direct children so they have this term as their parent
    $this->saveChildTerms( $term_info, $taxonomy, $action_type );
  }

	function deleteTerm(
		$term_id,
		$taxonomy_id,
		$taxonomy,
		$deleted_term,
		$object_ids
	) {
    $term_info = $this->getTermInfo( $term_id, $taxonomy, $deleted_term );
    $taxonomy_object = $term_info['taxonomy_object'] ?? null;

    if ( $this->isTermPrivate( $taxonomy_object ) ) {
      return;
    }

		$this->insertNewAction( [
			'action_type'         => 'DELETE',
			'title'               => $term_info['term']->name,
			'status'              => 'private',
			'node_id'             => $term_id,
			'relay_id'            => $term_info['global_relay_id'],
			'graphql_single_name' => $term_info['graphql_single_name'],
			'graphql_plural_name' => $term_info['graphql_plural_name'],
    ] );

    $this->saveTermRelatives( $term_info, $taxonomy, 'UPDATE', null );
  }

	function saveTerm( $term_id, $taxonomy, $action_type, $recursing = null ) {
		$term_info = $this->getTermInfo( $term_id, $taxonomy );
		$taxonomy_object = $term_info['taxonomy_object'] ?? null;

		if ( $this->isTermPrivate( $taxonomy_object) ) {
		return;
		}

		$this->insertNewAction( [
			'action_type'         => $action_type,
			'title'               => $term_info['term']->name ?? null,
			'status'              => 'publish', // publish means go in Gatsby @todo rename this..
			'node_id'             => $term_id,
			'relay_id'            => $term_info['global_relay_id'],
			'graphql_single_name' => $term_info['graphql_single_name'],
			'graphql_plural_name' => $term_info['graphql_plural_name'],
		] );

		$this->saveTermRelatives( $term_info, $taxonomy, $action_type, $recursing );
	}

	function deleteMediaItem( $attachment_id ) {
		$attachment = get_post( $attachment_id );

		$global_relay_id = Relay::toGlobalId(
			'post',
			$attachment_id
		);

		$this->insertNewAction( [
			'action_type'         => 'DELETE',
			'title'               => $attachment->post_title ?? "Attachment #$attachment_id",
			'status'              => 'publish',
			// there is no concept of inheriting post status in Gatsby, so images will always be considered published.
			'node_id'             => $attachment_id,
			'relay_id'            => $global_relay_id,
			'graphql_single_name' => 'mediaItem',
			'graphql_plural_name' => 'mediaItems',
		] );
	}

	function updateMediaItem( $override, $filename, $image, $mime_type, $post_id ) {

		$this->saveMediaItem( $post_id, 'UPDATE' );

		return null;
	}

	function saveMediaItem( $attachment_id, $action_type = 'CREATE' ) {
		$attachment = get_post( $attachment_id );

		if ( ! $attachment ) {
			return $attachment_id;
		}

		$global_relay_id = Relay::toGlobalId(
			'post',
			$attachment_id
		);

		$this->insertNewAction( [
			'action_type'         => $action_type,
			'title'               => $attachment->post_title ?? "Attachment #$attachment_id",
			'status'              => 'publish',
			// there is no concept of inheriting post status in Gatsby, so images will always be considered published.
			'node_id'             => $attachment_id,
			'relay_id'            => $global_relay_id,
			'graphql_single_name' => 'mediaItem',
			'graphql_plural_name' => 'mediaItems',
		] );
	}

	function deleteMenu( $menu_id ) {

		$global_relay_id = Relay::toGlobalId(
			'term',
			$menu_id
		);

		$this->insertNewAction( [
			'action_type'         => 'DELETE',
			'title'               => "Menu #${menu_id}",
			'status'              => 'trash', // menus don't have post status. This is for Gatsby
			'node_id'             => $menu_id,
			'relay_id'            => $global_relay_id,
			'graphql_single_name' => 'menu',
			'graphql_plural_name' => 'menus',
		] );
	}

	/**
	 * On save menus (created/updated)
	 */
	function saveMenu( $menu_id, $action_type ) {
		if (
			did_action( 'wp_update_nav_menu' ) > 1 ||
			did_action( 'wp_create_nav_menu' ) > 1
		) {
			return $menu_id;
		}

		// Get a menu object
		$menu_object = wp_get_nav_menu_object( $menu_id );

		// Bail if not a menu object
		if ( empty( $menu_object ) ) {
			return $menu_id;
		}

		$global_relay_id = Relay::toGlobalId(
			'term',
			$menu_id
		);

		$this->insertNewAction( [
			'action_type'         => $action_type,
			'title'               => $menu_object->name,
			'status'              => 'publish', // menus don't have post status. This is for Gatsby
			'node_id'             => $menu_id,
			'relay_id'            => $global_relay_id,
			'graphql_single_name' => 'menu',
			'graphql_plural_name' => 'menus',
		] );
	}

	function savePostGuardClauses( $post, $in_pre_save_post = false ) {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return false;
		}

		if ( $post->post_status === 'auto-draft' ) {
			return false;
		}

		$last_status_was_publish
			= $this->post_object_before_update->post_status ?? null
				!== 'publish';

		if (
			$last_status_was_publish &&
			$post->post_status === 'draft'
		) {
			return false;
		}

		if ( $post->post_type === 'revision' ) {
			return false;
		}

		if ( $post->post_type === 'action_monitor' ) {
			return false;
		}

		// if we've recorded this post being updated already
		// no need to do it twice
		if ( !$in_pre_save_post && in_array( $post->ID, $this->updated_post_ids ) ) {
			return false;
		}

		$duplicate_actions = new \WP_Query( [
			'post_type'  => 'action_monitor',
			'meta_query' => [
					'relation' => 'AND',
					[
						'key' => 'referenced_node_post_modified',
						'value' => $post->post_modified
					],
					[
						'key' => 'referenced_node_id',
						'value' => $post->ID
					],
				],
			]
		);


		if ( $duplicate_actions->found_posts ) {
			return false;
		}

		return true;
	}

	public $post_object_before_update;

	function preSavePost( $post_id, $updated_post_object ) {
		$post = get_post( $post_id );

		$this->post_object_before_update = $post;
	}

	/**
	 * On save post
	 */
	function savePost( $post_id, $post = null, $update_post_parent = true ) {
		if ( ! $post ) {
			$post = get_post( $post_id );
		}

		if ( ! $this->savePostGuardClauses( $post ) ) {
			return;
		}

		// store that we've saved an action for this post,
		// so that we don't store it more than once.
		array_push( $this->updated_post_ids, $post_id );

		$post_type_object = \get_post_type_object( $post->post_type );

		$title           = $post->post_title ?? '';
		$global_relay_id = '';
		$global_relay_id = Relay::toGlobalId(
			'post',
			absint( $post_id )
		);

		$referenced_node_single_name
			= $post_type_object->graphql_single_name ?? null;
		$referenced_node_plural_name
			= $post_type_object->graphql_plural_name ?? null;
		$referenced_node_modified_date
			= $post->post_modified;

		if ( $post->post_type === 'nav_menu_item' ) {
			// for now, bail on nav menu items.
			// we're pulling them as a side effect in Gatsby for now
			// once we can get a flat list of all menu items regardless
			// of location in WPGQL, this can be removed
			return $post_id;
			// $global_relay_id = Relay::toGlobalId( 'nav_menu_item', $post_id );
			// $title = "MenuItem #$post_id";
			// $referenced_node_single_name = 'menuItem';
			// $referenced_node_plural_name = 'menuItems';
		}

		//
		// add a check here to make sure this is a post type available in WPGQL
		// so that we don't monitor posts made by plugins
		// maybe add a filter to allow plugins to add themselves to this list of
		// whitelisted post types?
		//

		$action_type = null;

		// this post meta helps determine if this is a new post or not
		// since the 3rd argument in the save_post hook "$update" always
		// returns true unless using wp_insert_post(), which we're not
		$update = get_post_meta( $post_id, '__update', true );


		if ( $post->post_status === 'trash' && ! $update ) {
			// this post has already been trashed, Gutenberg just fires post_save 2x on trash. It happens in separate threads so did_action('post_save') doesn't increment. :(
			return $post_id;
		}

		if ( $post->post_status === 'trash' ) {
			$action_type = 'DELETE';
			// when we delete a post, Gatsby deletes it
			// that means when we untrash a post, it's a new
			// node for Gatsby. If WP thinks of untrashing as an update
			// rather than a create, Gatsby will error.
			// So set __update to false, when next time this post
			// is untrashed, we'll record it as a new post.
			update_post_meta( $post_id, '__update', false );
		} else {
			if ( ! $update ) {
				update_post_meta( $post_id, '__update', true );
			}

			$action_type = $update ? 'UPDATE' : 'CREATE';
		}

		$this->insertNewAction( [
			'action_type'         => $action_type,
			'title'               => $title,
			'status'              => $post->post_status,
			'node_id'             => $post_id,
			'relay_id'            => $global_relay_id,
			'graphql_single_name' => $referenced_node_single_name,
			'graphql_plural_name' => $referenced_node_plural_name,
			'post_modified'       => $referenced_node_modified_date,
		] );

		$previous_post_parent        = $this->post_object_before_update->post_parent ?? 0;
		$potentially_new_post_parent = $post->post_parent ?? 0;

		// @todo also move this logic Gatsby-side so it works
		// for all 2-way relationships
		if (
			$previous_post_parent !== $potentially_new_post_parent &&
			$update_post_parent
		) {
			if ( $potentially_new_post_parent !== 0 ) {
				// if we just saved a new post parent, we need to update the parent
				// so we have this page as a child.
				$this->savePost( $potentially_new_post_parent, null, false );
			}

			// if we previously had this page as a child of another page,
			// we need to update that page so this page isn't a child of it anymore..
			if ( $previous_post_parent !== 0 ) {
				$this->savePost( $previous_post_parent, null, false );
			}
		}

		// update the author node so that this node is recorded as a child
		// @todo move this logic Gatsby-side so that it works for all 2-way relationships
		$previous_author = $this->post_object_before_update->post_author ?? 0;
		$new_author      = $post->post_author ?? 0;

		if ( $previous_author !== $new_author && $previous_author !== 0 ) {
			// if we change the author we need to re-save the old author too
			$this->updateUser( $previous_author );
		}

		$this->updateUser( $new_author );
	}

	function registerPostGraphQLFields() {
		add_action(
			'graphql_register_types',
			function() {
				register_graphql_field(
					'ActionMonitorAction',
					'actionType',
					[
						'type'        => 'String',
						'description' => __(
							'The type of action (CREATE, UPDATE, DELETE)',
							'WPGatsby'
						),
						'resolve'     => function( $post ) {
							$action_type
								= get_post_meta( $post->ID, 'action_type', true );

							return $action_type ?? null;
						}
					]
				);
				register_graphql_field(
					'ActionMonitorAction',
					'referencedNodeStatus',
					[
						'type'        => 'String',
						'description' => __(
							'The post status of the post that triggered this action',
							'WPGatsby'
						),
						'resolve'     => function( $post ) {
							$referenced_node_status = get_post_meta(
								$post->ID,
								'referenced_node_status',
								true
							);

							return $referenced_node_status ?? null;
						}
					]
				);
				register_graphql_field(
					'ActionMonitorAction',
					'referencedNodeID',
					[
						'type'        => 'String',
						'description' => __(
							'The post ID of the post that triggered this action',
							'WPGatsby'
						),
						'resolve'     => function( $post ) {
							$referenced_node_id = get_post_meta(
								$post->ID,
								'referenced_node_id',
								true
							);

							return $referenced_node_id ?? null;
						}
					]
				);
				register_graphql_field(
					'ActionMonitorAction',
					'referencedNodeGlobalRelayID',
					[
						'type'        => 'String',
						'description' => __(
							'The global relay ID of the post that triggered this action',
							'WPGatsby'
						),
						'resolve'     => function( $post ) {
							$referenced_node_relay_id = get_post_meta(
								$post->ID,
								'referenced_node_relay_id',
								true
							);

							return $referenced_node_relay_id ?? null;
						}
					]
				);
				register_graphql_field(
					'ActionMonitorAction',
					'referencedNodeSingularName',
					[
						'type'        => 'String',
						'description' => __(
							'The WPGraphQL single name of the referenced post',
							'WPGatsby'
						),
						'resolve'     => function( $post ) {
							$referenced_node_single_name = get_post_meta(
								$post->ID,
								'referenced_node_single_name',
								true
							);

							return $referenced_node_single_name ?? null;
						}
					]
				);
				register_graphql_field(
					'ActionMonitorAction',
					'referencedNodePluralName',
					[
						'type'        => 'String',
						'description' => __(
							'The WPGraphQL plural name of the referenced post',
							'WPGatsby'
						),
						'resolve'     => function( $post ) {
							$referenced_node_plural_name = get_post_meta(
								$post->ID,
								'referenced_node_plural_name',
								true
							);

							return $referenced_node_plural_name ?? null;
						}
					]
				);

				register_graphql_field(
					'RootQueryToActionMonitorActionConnectionWhereArgs',
					'sinceTimestamp',
					[
						'type'        => 'Number',
						'description' => 'List Actions performed since a timestamp.'
					]
				);

				add_filter(
					'graphql_post_object_connection_query_args',
					function( $args ) {
						$sinceTimestamp = $args['sinceTimestamp'] ?? null;

						if ( $sinceTimestamp ) {
							$args['date_query'] = [
								'after' => date( 'c', $sinceTimestamp / 1000 )
							];
						}

						return $args;
					}
				);
			}
		);
	}

	/**
	 * Add post meta to schema
	 */
	function registerGraphQLFields() {
		$this->registerPostGraphQLFields();
	}

	/**
	 * Register Action monitor post type
	 */
	function initPostType() {
		/**
		 * Post Type: Action Monitor.
		 */

		$labels = array(
			"name"          => __( "Action Monitor", "WPGatsby" ),
			"singular_name" => __( "Action Monitor", "WPGatsby" ),
		);

		$args = array(
			"label"                 => __( "Action Monitor", "WPGatsby" ),
			"labels"                => $labels,
			"description"           => "Used to keep a log of actions in WordPress for cache invalidation in gatsby-source-wpgraphql.",
			"public"                => false,
			"publicly_queryable"    => false,
			"show_ui"               => defined( 'GRAPHQL_DEBUG' ) && GRAPHQL_DEBUG,
			"delete_with_user"      => false,
			"show_in_rest"          => true,
			"rest_base"             => "",
			"rest_controller_class" => "WP_REST_Posts_Controller",
			"has_archive"           => false,
			"show_in_menu"          => true,
			"show_in_nav_menus"     => true,
			"exclude_from_search"   => false,
			"capability_type"       => "post",
			"map_meta_cap"          => true,
			"hierarchical"          => false,
			"rewrite"               => array( "slug" => "action_monitor", "with_front" => true ),
			"query_var"             => true,
			"supports"              => array( "title" ),
			"show_in_graphql"       => true,
			"graphql_single_name"   => "ActionMonitorAction",
			"graphql_plural_name"   => "ActionMonitorActions",
		);

		register_post_type( "action_monitor", $args );
	}

	public function trigger_dispatch() {
		$webhook_field = Settings::prefix_get_option( 'builds_api_webhook', 'wpgatsby_settings', false );

		if ( $webhook_field && $this->should_dispatch ) {

			$webhooks = explode( ',', $webhook_field );

			foreach ( $webhooks as $webhook ) {
				wp_safe_remote_post( $webhook );
			}

		}
	}
}
