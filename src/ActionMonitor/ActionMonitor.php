<?php

namespace WPGatsby\ActionMonitor;

use WP_Post;
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
	 *
	 * @var array
	 */
	protected $updated_post_ids = [];

	/**
	 * Whether WPGraphQL Debug Mode is active
	 *
	 * @var bool Whether GraphQL Debug Mode is active
	 */
	protected $wpgraphql_debug_mode = false;

	/**
	 * @var mixed|null|WP_Post The post object before update
	 */
	public $post_object_before_update = null;

	/**
	 * Stores a list of post type names that the Gatsby Action Monitor should track
	 * @var array
	 */
	protected $tracked_post_types = [];

	/**
	 * Stores a list of taxonomy names that the Gatsby Action Monitor should track
	 * @var array
	 */
	protected $tracked_taxonomies = [];

	/**
	 * Set up the Action monitor when the class is initialized
	 */
	public function __construct() {

		// Determine if WPGraphQL is in debug mode
		$this->wpgraphql_debug_mode = class_exists( 'WPGraphQL' ) ? \WPGraphQL::debug() : false;

		// Initialize the types to track (public post types and taxonomies that show_in_graphql)
		add_action( 'wp_loaded', [ $this, 'init_tracked_types' ] );

		// Register post type and taxonomies to track CRUD events in WordPress
		add_action( 'init', [ $this, 'init_post_type_and_taxonomies' ] );
		add_filter( 'manage_action_monitor_posts_columns', [ $this, 'add_modified_column' ], 10 );
		add_action( 'manage_action_monitor_posts_custom_column', [
			$this,
			'render_modified_column'
		], 10, 2 );

		// Trigger webhook dispatch
		add_action( 'shutdown', [ $this, 'trigger_dispatch' ] );

		$this->registerGraphQLFields();
		$this->monitor_actions();

	}

	/**
	 * Initialize the types to track activity for.
	 *
	 * Default is public post types and taxonomies that are set to show_in_graphql
	 *
	 * Can be filtered with "gatsby_action_monitor_tracked_post_types" and "gatsby_action_monitor_tracked_taxonomies"
	 */
	public function init_tracked_types() {

		/**
		 * Filters the post_types that Gatsby Tracks actions for
		 *
		 * @param array $post_types The names of the post types Gatsby Action Monitor tracks
		 */
		$tracked_post_types = apply_filters( 'gatsby_action_monitor_tracked_post_types', get_post_types([ 'show_in_graphql' => true, 'public' => true ]) );
		$this->tracked_post_types = ! empty( $tracked_post_types ) && is_array( $tracked_post_types ) ? $tracked_post_types : [];

		/**
		 * Filters the taxonomies that Gatsby tracks actions for
		 *
		 * @param array $taxonomies The names of the taxonomies Gatsby Action Monitor tracks
		 */
		$tracked_taxonomies = apply_filters( 'gatsby_action_monitor_tracked_taxonomies', get_taxonomies([ 'show_in_graphql' => true, 'public' => true ]) );
		$this->tracked_taxonomies = ! empty( $tracked_taxonomies ) && is_array( $tracked_taxonomies ) ? $tracked_taxonomies : [];

	}

	/**
	 * Register Action monitor post type and associated taxonomies.
	 *
	 * The post type is used to store records of CRUD actions that have occurred in WordPress so
	 * that Gatsby can keep in Sync with changes in WordPress.
	 *
	 * The taxonomies are registered to store data related to the actions, but make it more
	 * efficient to filter actions by the values as Tax Queries are much more efficient than Meta
	 * Queries.
	 */
	public function init_post_type_and_taxonomies() {

		/**
		 * Post Type: Action Monitor.
		 */
		$post_type_labels = [
			"name"          => __( "Action Monitor", "WPGatsby" ),
			"singular_name" => __( "Action Monitor", "WPGatsby" ),
		];

		// Registers the post_type that logs actions for Gatsby
		register_post_type( "action_monitor", [
			"label"                 => __( "Action Monitor", "WPGatsby" ),
			"labels"                => $post_type_labels,
			"description"           => "Used to keep a log of actions in WordPress for cache invalidation in gatsby-source-wordpress.",
			"public"                => false,
			"publicly_queryable"    => false,
			"show_ui"               => $this->wpgraphql_debug_mode,
			"delete_with_user"      => false,
			"show_in_rest"          => false,
			"rest_base"             => "",
			"rest_controller_class" => "WP_REST_Posts_Controller",
			"has_archive"           => false,
			"show_in_menu"          => $this->wpgraphql_debug_mode,
			"show_in_nav_menus"     => false,
			"exclude_from_search"   => true,
			"capability_type"       => "post",
			"map_meta_cap"          => true,
			"hierarchical"          => false,
			"rewrite"               => [
				"slug"       => "action_monitor",
				"with_front" => true
			],
			"query_var"             => true,
			"supports"              => [ "title", "editor" ],
			"show_in_graphql"       => true,
			"graphql_single_name"   => "ActionMonitorAction",
			"graphql_plural_name"   => "ActionMonitorActions",
		] );

		// Registers the taxonomy that connects the node type to the action_monitor post
		register_taxonomy( 'gatsby_action_ref_node_type', 'action_monitor', [
			'label'               => __( 'Referenced Node Type', 'WPGatsby' ),
			'public'              => false,
			'show_ui'             => $this->wpgraphql_debug_mode,
			'show_in_graphql'     => true,
			'graphql_single_name' => 'ReferencedNodeType',
			'graphql_plural_name' => 'ReferencedNodeTypes',
			'hierarchical'        => false,
			'show_in_nav_menus'   => false,
			'show_tagcloud'       => false,
			'show_admin_column'   => true,
		] );

		// Registers the taxonomy that connects the node databaseId to the action_monitor post
		register_taxonomy( 'gatsby_action_ref_node_dbid', 'action_monitor', [
			'label'               => __( 'Referenced Node Database ID', 'WPGatsby' ),
			'public'              => false,
			'show_ui'             => $this->wpgraphql_debug_mode,
			'show_in_graphql'     => true,
			'graphql_single_name' => 'ReferencedNodeDatabaseId',
			'graphql_plural_name' => 'ReferencedNodeDatabaseIds',
			'hierarchical'        => false,
			'show_in_nav_menus'   => false,
			'show_tagcloud'       => false,
			'show_admin_column'   => true,
		] );

		// Registers the taxonomy that connects the node global ID to the action_monitor post
		register_taxonomy( 'gatsby_action_ref_node_id', 'action_monitor', [
			'label'               => __( 'Referenced Node Global ID', 'WPGatsby' ),
			'public'              => false,
			'show_ui'             => $this->wpgraphql_debug_mode,
			'show_in_graphql'     => true,
			'graphql_single_name' => 'ReferencedNodeId',
			'graphql_plural_name' => 'ReferencedNodeIds',
			'hierarchical'        => false,
			'show_in_nav_menus'   => false,
			'show_tagcloud'       => false,
			'show_admin_column'   => true,
		] );

		// Registers the taxonomy that connects the action type (CREATE, UPDATE, DELETE) to the action_monitor post
		register_taxonomy( 'gatsby_action_type', 'action_monitor', [
			'label'               => __( 'Action Type', 'WPGatsby' ),
			'public'              => false,
			'show_ui'             => $this->wpgraphql_debug_mode,
			'show_in_graphql'     => true,
			'graphql_single_name' => 'ActionMonitorActionType',
			'graphql_plural_name' => 'ActionMonitorActionTypes',
			'hierarchical'        => false,
			'show_in_nav_menus'   => false,
			'show_tagcloud'       => false,
			'show_admin_column'   => true,
		] );

	}

	/**
	 * Adds a column to the action monitor Post Type to show the last modified time
	 *
	 * @param array $columns The column names included in the post table
	 *
	 * @return array
	 */
	public function add_modified_column( array $columns ) {
		$columns['gatsby_last_modified'] = __( 'Last Modified', 'WPGatsby' );

		return $columns;
	}

	/**
	 * Renders the last modified time in the action_monitor post type "modified" column
	 *
	 * @param string $column_name The name of the column
	 * @param int    $post_id     The ID of the post in the table
	 *
	 */
	public function render_modified_column( string $column_name, int $post_id ) {
		if ( 'gatsby_last_modified' === $column_name ) {
			$m_orig   = get_post_field( 'post_modified', $post_id, 'raw' );
			$m_stamp  = strtotime( $m_orig );
			$modified = date( 'n/j/y @ g:i a', $m_stamp );
			echo '<p class="mod-date">';
			echo '<em>' . esc_html( $modified ) . '</em><br />';
			echo '</p>';
		}
	}

	/**
	 * Deletes all posts of the action_monitor post_type that are 7 days old, as well as any
	 * associated post meta and term relationships.
	 *
	 * @return bool|int
	 */
	public function garbageCollectActions() {

		global $wpdb;
		$post_type = 'action_monitor';
		$sql       = wp_strip_all_tags(
			'DELETE posts, pm, pt
			FROM ' . $wpdb->prefix . 'posts AS posts
			LEFT JOIN ' . $wpdb->prefix . 'term_relationships AS pt ON pt.object_id = posts.ID
			LEFT JOIN ' . $wpdb->prefix . 'postmeta AS pm ON pm.post_id = posts.ID
			WHERE posts.post_type = \'%1$s\'
			AND posts.post_modified < \'%2$s\'', true
		);

		$query = $wpdb->prepare( $sql, $post_type, date( "Y-m-d H:i:s", strtotime( '-7 days' ) ) );

		return $wpdb->query( $query );
	}

	/**
	 * Insert new action
	 *
	 * $args = [$action_type, $title, $status, $node_id, $relay_id, $graphql_single_name,
	 * $graphql_plural_name]
	 *
	 * @param array $args Array of arguments to configure the action to be inserted
	 */
	public function insertNewAction( array $args ) {
		if (
			! isset( $args['action_type'] ) ||
			! isset( $args['title'] ) ||
			! isset( $args['node_id'] ) ||
			! isset( $args['relay_id'] ) ||
			! isset( $args['graphql_single_name'] ) ||
			! isset( $args['graphql_plural_name'] ) ||
			! isset( $args['status'] )
		) {
			// @todo log that this action isn't working??
			return;
		}

		$time = time();

		$node_type = 'unknown';
		if ( isset( $args['graphql_single_name'] ) ) {
			$node_type = $args['graphql_single_name'];
		} else if ( isset( $args['relay_id'] ) ) {
			$id_parts = Relay::fromGlobalId( $args['relay_id'] );
			if ( ! isset( $id_parts['type'] ) ) {
				$node_type = $id_parts['type'];
			}
		}

		// Check to see if an action already exists for this node type/database id
		$existing = new \WP_Query( [
			'post_type'      => 'action_monitor',
			'post_status'    => 'any',
			'posts_per_page' => 1,
			'no_found_rows'  => true,
			'fields'         => 'ids',
			'tax_query'      => [
				'relation' => 'AND',
				[
					'taxonomy' => 'gatsby_action_ref_node_dbid',
					'field'    => 'name',
					'terms'    => sanitize_text_field( $args['node_id'] ),
				],
				[
					'taxonomy' => 'gatsby_action_ref_node_type',
					'field'    => 'name',
					'terms'    => $node_type,
				],
			],
		] );

		// If there's already an action logged for this node, update the record
		if ( isset( $existing->posts ) && ! empty( $existing->posts ) ) {

			$existing_id            = $existing->posts[0];
			$action_monitor_post_id = wp_update_post( [
				'ID'           => absint( $existing_id ),
				'post_title'   => $args['title'],
				'post_content' => wp_json_encode( $args )
			] );

		} else {

			$action_monitor_post_id = \wp_insert_post(
				[
					'post_title'   => $args['title'],
					'post_type'    => 'action_monitor',
					'post_status'  => 'private',
					'author'       => - 1,
					'post_name'    => sanitize_title( "{$args['title']}-{$time}" ),
					'post_content' => wp_json_encode( $args ),
				]
			);

			wp_set_object_terms( $action_monitor_post_id, $args['action_type'], 'gatsby_action_type' );
			wp_set_object_terms( $action_monitor_post_id, sanitize_text_field( $args['relay_id'] ), 'gatsby_action_ref_node_id' );
			wp_set_object_terms( $action_monitor_post_id, sanitize_text_field( $args['node_id'] ), 'gatsby_action_ref_node_dbid' );
			wp_set_object_terms( $action_monitor_post_id, sanitize_text_field( $node_type ), 'gatsby_action_ref_node_type' );

		}


		if ( $action_monitor_post_id !== 0 ) {
			\update_post_meta(
				$action_monitor_post_id,
				'referenced_node_status',
				$args['status'] // menus don't have post status. This is for Gatsby
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

			\wp_update_post( [
				'ID'          => $action_monitor_post_id,
				'post_status' => 'publish'
			] );

		}

		// we've saved at least 1 action, so we should update
		$this->should_dispatch = true;

		// Delete old actions
		$this->garbageCollectActions();

	}

	/**
	 * Use WP Action hooks to create action monitor posts
	 */
	function monitor_actions() {

		// Post / Page actions
		add_action( 'save_post', [ $this, 'save_post' ], 10, 3 );
		add_action( 'pre_post_update', [ $this, 'pre_save_post' ], 10, 2 );

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

		$theme_slug = get_option( 'stylesheet' );

		add_filter( "update_option_theme_mods_${theme_slug}", [
			$this,
			'deleteMenusWithNoLocation'
		], 10, 2 );

		// User actions
		add_action( 'save_post', [ $this, 'updateUserIsPublic' ], 10, 2 );

		add_action( 'profile_update', [ $this, 'updateUser' ], 10 );

		add_action( 'delete_user', [ $this, 'deleteUser' ], 10, 2 );

		// Post meta updates
		add_action( "updated_post_meta", [ $this, 'modifyMeta' ], 100, 3 );
		add_action( "added_post_meta", [ $this, 'modifyMeta' ], 100, 3 );
		add_action( "deleted_post_meta", [ $this, 'modifyMeta' ], 100, 3 );

		// Non node root fields (options, settings, etc)
		//
		// temporarily disabling this because it can potentially cause some real problems
		// need to think about how this works a bit more before releasing it.
		// add_action( 'updated_option', [ $this, 'saveNonNodeRootFields' ], 10, 3 );

	}

	function saveNonNodeRootFields( $option_name, $old_value, $value ) {
		$id = 'non_node_root_fields';

		$this->insertNewAction(
			[
				'action_type'         => 'NON_NODE_ROOT_FIELDS',
				'title'               => 'Saved Option: ' . $option_name,
				'node_id'             => $id,
				'relay_id'            => $id,
				'graphql_single_name' => false,
				'graphql_plural_name' => false,
				'status'              => false
			]
		);
	}

	function modifyMeta( $meta_id, $object_id, $meta_key ) {
		if ( $meta_key === '_edit_lock' ) {
			return;
		}

		if ( get_post_type( $object_id ) === 'action_monitor' ) {
			return;
		}

		$this->save_post( $object_id );
	}

	function deleteUser( $user_id, $reassigned_user_id ) {
		$this->updateUser( $user_id, 'DELETE', 'private ' );

		if ( $reassigned_user_id ) {
			// get all their posts that are
			// available in wpgraphql and update each of them

			if ( ! empty( $this->tracked_post_types ) ) {

				foreach ( $this->tracked_post_types as $post_type ) {
					$query = new \WP_Query( [
						'post_type'      => $post_type,
						'author'         => $user_id,
						'no_found_rows'  => true,
						'posts_per_page' => - 1
						// @todo this is a big no-no. Could break a large site.
						// In Gatsby we should store potential 2 way connections and if there is a 2 way
						// connection and a post is updated, check its child nodes for 2 way connections.
						// For any 2 way connections check if this node is a child of that node.
						// If it's not then refetch that node as well.
					] );

					if ( $query->have_posts() ) {
						while ( $query->have_posts() ) {
							$query->the_post();
							$post = get_post();
							$this->save_post( $post->ID, $post );
						}

						wp_reset_postdata();
					}
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

		$user_is_public = false;

		if ( ! empty( $this->tracked_post_types ) ) {

			foreach ( $this->tracked_post_types as $post_type ) {
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

		$is_private = false;

		// if the terms tax is not public, don't monitor it
		if ( ! $taxonomy_object->public ) {
			$is_private = true;
		}

		// if the terms tax isn't shown in graphql, don't monitor it
		if ( ! in_array( $taxonomy_object->name, $this->tracked_taxonomies, true ) ) {
			$is_private = true;
		}

		return apply_filters( 'gatsby_track_taxonomy', $is_private, $taxonomy_object );
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

		$term    = $term_info['term'] ?? null;
		$term_id = $term->term_id ?? null;

		if ( ! $term_id ) {
			return null;
		}

		$term_children = get_terms( [
			'parent'     => $term_id,
			'taxonomy'   => $taxonomy_object->name ?? null,
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
		$term_info       = $this->getTermInfo( $term_id, $taxonomy, $deleted_term );
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
		$term_info       = $this->getTermInfo( $term_id, $taxonomy );
		$taxonomy_object = $term_info['taxonomy_object'] ?? null;

		if ( $this->isTermPrivate( $taxonomy_object ) ) {
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

		$menu_locations = get_nav_menu_locations();

		// if no menu locations are assigned to this menu,
		// bail early because it's a private menu
		if ( ! in_array( $menu_id, $menu_locations ) ) {
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

	function deleteMenusWithNoLocation( $old_value, $value ) {
		if ( isset( $old_value['nav_menu_locations'] ) ) {
			$old_locations = $old_value['nav_menu_locations'];
			$new_locations = $value['nav_menu_locations'];

			// we only need to find removed id's because
			// the menu that was updated will be accounted for in
			// $this->saveMenu()
			$menu_ids_removed_from_locations = array_diff(
				$old_locations,
				$new_locations
			);

			foreach ( $menu_ids_removed_from_locations as $location => $menu_id ) {
				$this->deleteMenu( $menu_id );
			}
		}
	}

	function savePostGuardClauses( $post, $in_pre_save_post = false ) {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return false;
		}

		if ( ! in_array( $post->post_type, $this->tracked_post_types, true ) ) {
			return false;
		}

		if ( $post->post_status === 'auto-draft' ) {
			return false;
		}

		$last_status_wasnt_publish
			= ( $this->post_object_before_update->post_status ?? null )
			  !== 'publish';

		if (
			$last_status_wasnt_publish &&
			$post->post_status === 'draft'
		) {
			return false;
		}

		if ( $post->post_type === 'revision' ) {
			return false;
		}

		if ( $post->post_status === 'draft' ) {
			return false;
		}

		// if we've recorded this post being updated already
		// no need to do it twice
		if ( ! $in_pre_save_post && in_array( $post->ID, $this->updated_post_ids ) ) {
			return false;
		}

		return true;
	}

	/**
	 * @param int   $post_id   The ID of the post being updated
	 * @param array $post_data The updated Post Object
	 */
	public function pre_save_post( int $post_id, array $post_data ) {
		$post = get_post( $post_id );
		if ( $post instanceof WP_Post ) {
			$this->post_object_before_update = $post;
		}
	}

	/**
	 * On save post
	 *
	 * @param int  $post_id            The ID of the post being saved
	 * @param mixed \WP_Post|null $post    The post being saved
	 * @param bool $update_post_parent Whether the action is an update or create
	 *
	 * @return mixed void|int|null
	 */
	function save_post( int $post_id, $post = null, $update_post_parent = true ) {
		if ( ! $post ) {
			$post = get_post( $post_id );
		}

		if ( ! $this->savePostGuardClauses( $post ) ) {
			return  null;
		}

		// store that we've saved an action for this post,
		// so that we don't store it more than once.
		array_push( $this->updated_post_ids, $post_id );

		$post_type_object = \get_post_type_object( $post->post_type );

		$title           = $post->post_title ?? '';
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
				$this->save_post( $potentially_new_post_parent, null, false );
			}

			// if we previously had this page as a child of another page,
			// we need to update that page so this page isn't a child of it anymore..
			if ( $previous_post_parent !== 0 ) {
				$this->save_post( $previous_post_parent, null, false );
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

							$terms = get_the_terms( $post->databaseId, 'gatsby_action_type' );

							if ( ! is_wp_error( $terms ) && ! empty( $terms ) ) {
								$action_type = (string) $terms[0]->name;
							} else {
								$action_type
									= get_post_meta( $post->ID, 'action_type', true );
							}

							return $action_type ? $action_type : null;
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

							$terms = get_the_terms( $post->databaseId, 'gatsby_action_ref_node_dbid' );
							if ( ! is_wp_error( $terms ) && ! empty( $terms ) ) {
								$referenced_node_id = (string) $terms[0]->name;
							} else {
								$referenced_node_id = get_post_meta(
									$post->ID,
									'referenced_node_id',
									true
								);
							}

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

							$terms = get_the_terms( $post->databaseId, 'gatsby_action_ref_node_id' );
							if ( ! is_wp_error( $terms ) && ! empty( $terms ) ) {
								$referenced_node_relay_id = (string) $terms[0]->name;
							} else {

								$referenced_node_relay_id = get_post_meta(
									$post->ID,
									'referenced_node_relay_id',
									true
								);
							}

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
	 * Triggers the dispatch to the remote endpoint(s)
	 */
	public function trigger_dispatch() {
		$build_webhook_field = Settings::prefix_get_option( 'builds_api_webhook', 'wpgatsby_settings', false );
		$preview_webhook_field = Settings::prefix_get_option( 'preview_api_webhook', 'wpgatsby_settings', false );

		$we_should_call_webhooks = 
			( $build_webhook_field || $preview_webhook_field ) &&
			$this->should_dispatch;

		if ( $we_should_call_webhooks ) {
			$webhooks = array_merge(
				explode( ',', $build_webhook_field ),
				explode( ',', $preview_webhook_field)
			);

			$truthy_webhooks = array_filter( $webhooks );
			$unique_webhooks = array_unique( $truthy_webhooks ); 

			foreach ( $unique_webhooks as $webhook ) {
				$args = apply_filters( 'gatsby_trigger_dispatch_args', [], $webhook );

				wp_safe_remote_post( $webhook, $args );
			}

		}
	}
}
