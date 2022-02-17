<?php

namespace WPGatsby\ActionMonitor;

use WP_Post;
use WPGatsby\Admin\Settings;

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
	 * Holds the classes for each action monitor
	 *
	 * @var array
	 */
	protected $action_monitors;

	/**
	 * Set up the Action monitor when the class is initialized
	 */
	public function __construct() {

		// Determine if WPGraphQL is in debug mode
		$this->wpgraphql_debug_mode = 
			class_exists( 'WPGraphQL' ) && method_exists( 'WPGraphQL', 'debug' ) 
				? \WPGraphQL::debug()
				: false;

		// Initialize action monitors
		add_action( 'wp_loaded', [ $this, 'init_action_monitors' ], 11 );

		// Register the GraphQL Fields Gatsby Source WordPress needs to interact with the Action Monitor
		add_action( 'graphql_register_types', [ $this, 'register_graphql_fields' ] );

		// Register post type and taxonomies to track CRUD events in WordPress
		add_action( 'init', [ $this, 'init_post_type_and_taxonomies' ] );
		add_filter( 'manage_action_monitor_posts_columns', [ $this, 'add_modified_column' ], 10 );
		add_action(
			'manage_action_monitor_posts_custom_column',
			[
				$this,
				'render_modified_column',
			],
			10,
			2
		);

		// Trigger webhook dispatch
		add_action( 'shutdown', [ $this, 'trigger_dispatch' ] );

		// allow any role to use Gatsby Preview
		add_action( 'admin_init', [ $this, 'action_monitor_add_role_caps' ], 999 );
	}

	/**
	 * For Action Monitor, all of these roles need to be able to view and edit private action monitor posts so that Preview works for all roles.
	 */
	public function action_monitor_add_role_caps() {
		$doing_graphql_request
					= defined( 'GRAPHQL_REQUEST' ) && true === GRAPHQL_REQUEST;

		if ( $doing_graphql_request ) {
			// we only need to add roles one time. checking capabilities repeatedly isn't needed, just when the user is in the admin area is fine.
			return;
		}

		$roles = apply_filters(
			'gatsby_private_action_monitor_roles',
			[
				'editor',
				'administrator',
				'contributor',
				'author'
			]
		);

		foreach( $roles as $the_role ) {
			$role = get_role($the_role);

			if ( ! $role->has_cap( 'read_private_action_monitor_posts' ) ) {
				$role->add_cap( 'read_private_action_monitor_posts' );
			}
			
			if ( ! $role->has_cap( 'edit_others_action_monitor_posts' ) ) {
				$role->add_cap( 'edit_others_action_monitor_posts' );
			}
		}
	}

	/**
	 * Get the post types that are tracked by WPGatsby.
	 *
	 * @return array|mixed|void
	 */
	public function get_tracked_post_types() {
		$public_post_types = get_post_types(
			[
				'show_in_graphql' => true,
				'public'          => true,
			]
		);

		$publicly_queryable_post_types = get_post_types(
			[
				'show_in_graphql'    => true,
				'public'             => false,
				'publicly_queryable' => true,
			]
		);

		$excludes = [
			'action_monitor' => 'action_monitor',
		];

		$tracked_post_types = array_diff(
			array_merge( $public_post_types, $publicly_queryable_post_types ),
			$excludes
		);

		$tracked_post_types = apply_filters(
			'gatsby_action_monitor_tracked_post_types',
			$tracked_post_types
		);

		return ! empty( $tracked_post_types ) && is_array( $tracked_post_types ) ? $tracked_post_types : [];
	}

	/**
	 * Get the taxonomies that are tracked by WPGatsby
	 *
	 * @return array|mixed|void
	 */
	public function get_tracked_taxonomies() {
		$tracked_taxonomies = apply_filters(
			'gatsby_action_monitor_tracked_taxonomies',
			get_taxonomies(
				[
					'show_in_graphql' => true,
					'public'          => true,
				]
			)
		);

		return ! empty( $tracked_taxonomies ) && is_array( $tracked_taxonomies ) ? $tracked_taxonomies : [];
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
			'name'          => __( 'Action Monitor', 'WPGatsby' ),
			'singular_name' => __( 'Action Monitor', 'WPGatsby' ),
		];

		// Registers the post_type that logs actions for Gatsby
		register_post_type(
			'action_monitor',
			[
				'label'                 => __( 'Action Monitor', 'WPGatsby' ),
				'labels'                => $post_type_labels,
				'description'           => 'Used to keep a log of actions in WordPress for cache invalidation in gatsby-source-wordpress.',
				'public'                => false,
				'publicly_queryable'    => true,
				'show_ui'               => $this->wpgraphql_debug_mode,
				'delete_with_user'      => false,
				'show_in_rest'          => false,
				'rest_base'             => '',
				'rest_controller_class' => 'WP_REST_Posts_Controller',
				'has_archive'           => false,
				'show_in_menu'          => $this->wpgraphql_debug_mode,
				'show_in_nav_menus'     => false,
				'exclude_from_search'   => true,
				'capabilities'          => [
					// these custom capabilities allow any role to use Preview
					'read_private_posts' => 'read_private_action_monitor_posts',
					'edit_others_posts'  => 'edit_others_action_monitor_posts', 
					// these are regular role capabilities for a CPT
					'create_post'        => 'create_post', 
					'edit_post'          => 'edit_post', 
					'read_post'          => 'read_post', 
					'delete_post'        => 'delete_post', 
					'edit_posts'         => 'edit_posts', 
					'publish_posts'      => 'publish_posts',       
					'create_posts'       => 'create_posts'
				],
				'map_meta_cap'          => false,
				'hierarchical'          => false,
				'rewrite'               => [
					'slug'       => 'action_monitor',
					'with_front' => true,
				],
				'query_var'             => true,
				'supports'              => [ 'title', 'editor' ],
				'show_in_graphql'       => true,
				'graphql_single_name'   => 'ActionMonitorAction',
				'graphql_plural_name'   => 'ActionMonitorActions',
			]
		);

		// Registers the taxonomy that connects the node type to the action_monitor post
		register_taxonomy(
			'gatsby_action_ref_node_type',
			'action_monitor',
			[
				'label'               => __( 'Referenced Node Type', 'WPGatsby' ),
				'public'              => false,
				'show_ui'             => $this->wpgraphql_debug_mode,
				'show_in_graphql'     => false,
				'graphql_single_name' => 'ReferencedNodeType',
				'graphql_plural_name' => 'ReferencedNodeTypes',
				'hierarchical'        => false,
				'show_in_nav_menus'   => false,
				'show_tagcloud'       => false,
				'show_admin_column'   => true,
			]
		);

		// Registers the taxonomy that connects the node databaseId to the action_monitor post
		register_taxonomy(
			'gatsby_action_ref_node_dbid',
			'action_monitor',
			[
				'label'               => __( 'Referenced Node Database ID', 'WPGatsby' ),
				'public'              => false,
				'show_ui'             => $this->wpgraphql_debug_mode,
				'show_in_graphql'     => false,
				'graphql_single_name' => 'ReferencedNodeDatabaseId',
				'graphql_plural_name' => 'ReferencedNodeDatabaseIds',
				'hierarchical'        => false,
				'show_in_nav_menus'   => false,
				'show_tagcloud'       => false,
				'show_admin_column'   => true,
			]
		);

		// Registers the taxonomy that connects the node global ID to the action_monitor post
		register_taxonomy(
			'gatsby_action_ref_node_id',
			'action_monitor',
			[
				'label'               => __( 'Referenced Node Global ID', 'WPGatsby' ),
				'public'              => false,
				'show_ui'             => $this->wpgraphql_debug_mode,
				'show_in_graphql'     => false,
				'graphql_single_name' => 'ReferencedNodeId',
				'graphql_plural_name' => 'ReferencedNodeIds',
				'hierarchical'        => false,
				'show_in_nav_menus'   => false,
				'show_tagcloud'       => false,
				'show_admin_column'   => true,
			]
		);

		// Registers the taxonomy that connects the action type (CREATE, UPDATE, DELETE) to the action_monitor post
		register_taxonomy(
			'gatsby_action_type',
			'action_monitor',
			[
				'label'               => __( 'Action Type', 'WPGatsby' ),
				'public'              => false,
				'show_ui'             => $this->wpgraphql_debug_mode,
				'show_in_graphql'     => false,
				'hierarchical'        => false,
				'show_in_nav_menus'   => false,
				'show_tagcloud'       => false,
				'show_admin_column'   => true,
			]
		);

		register_taxonomy( 'gatsby_action_stream_type', 'action_monitor', [
			'label'               => __( 'Stream Type', 'WPGatsby' ),
			'public'              => false,
			'show_ui'             => $this->wpgraphql_debug_mode,
			'show_in_graphql'     => false,
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
	 * Sets should_dispatch to true
	 */
	public function schedule_dispatch() {
		$this->should_dispatch = true;
	}

	/**
	 * Deletes all posts of the action_monitor post_type that are 7 days old, as well as any
	 * associated post meta and term relationships.
	 *
	 * @return bool|int
	 */
	public function garbage_collect_actions() {

		global $wpdb;
		$post_type = 'action_monitor';
		$sql       = wp_strip_all_tags(
			'DELETE posts, pm, pt
			FROM ' . $wpdb->prefix . 'posts AS posts
			LEFT JOIN ' . $wpdb->prefix . 'term_relationships AS pt ON pt.object_id = posts.ID
			LEFT JOIN ' . $wpdb->prefix . 'postmeta AS pm ON pm.post_id = posts.ID
			WHERE posts.post_type = \'%1$s\'
			AND posts.post_modified < \'%2$s\'',
			true
		);

		$query = $wpdb->prepare( $sql, $post_type, date( 'Y-m-d H:i:s', strtotime( '-7 days' ) ) );

		return $wpdb->query( $query );
	}

	/**
	 * Given the name of an Action Monitor, this returns it
	 *
	 * @param string $name The name of the Action Monitor to get
	 *
	 * @return mixed|null
	 */
	public function get_action_monitor( string $name ) {
		return $this->action_monitors[ $name ] ?? null;
	}

	/**
	 * Use WP Action hooks to create action monitor posts
	 */
	function init_action_monitors() {

		$class_names = [
			'AcfMonitor',
			'MediaMonitor',
			'NavMenuMonitor',
			'PostMonitor',
			'PostTypeMonitor',
			'SettingsMonitor',
			'TaxonomyMonitor',
			'TermMonitor',
			'UserMonitor',
			'PreviewMonitor',
		];

		$action_monitors = [];

		foreach ( $class_names as $class_name ) {
			$class = 'WPGatsby\ActionMonitor\Monitors\\' . $class_name;
			if ( class_exists( $class ) ) {
				$monitor = new $class( $this );
				$action_monitors[ $class_name ] = $monitor;
			}
		}

		/**
		 * Filter the action monitors. This can allow for other monitors
		 * to be registered, or can allow for monitors to be overridden.
		 *
		 * Overriding monitors is not advised, but there are cases where it might
		 * be necessary. Override with caution.
		 *
		 * @param array $action_monitors
		 * @param \WPGatsby\ActionMonitor\ActionMonitor $monitor The class instance, used to initialize the monitor.
		 */
		$this->action_monitors = apply_filters( 'gatsby_action_monitors', $action_monitors, $this );

		do_action( 'gatsby_init_action_monitors', $this->action_monitors );

	}

	function register_post_graphql_fields() {

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
				},
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
				},
			]
		);

		register_graphql_field(
			'ActionMonitorAction',
			'previewData',
			[
				'type'        => 'GatsbyPreviewData',
				'description' => __(
					'The preview data of the post that triggered this action.',
					'WPGatsby'
				),
				'resolve'     => function( $post ) {
					$referenced_node_preview_data = get_post_meta(
						$post->ID,
						'_gatsby_preview_data',
						true
					);

					return $referenced_node_preview_data 
							&& $referenced_node_preview_data !== "" 
								? json_decode( $referenced_node_preview_data )
								: null;
				}
			]
		);

		register_graphql_object_type(
			'GatsbyPreviewData',
			[
				'description' => __( 'Gatsby Preview webhook data.', 'WPGatsby' ),
				'fields'      => [
					'previewDatabaseId'  => [
						'type' => 'Int',
						'description' => __( 'The WordPress database ID of the preview. Could be a revision or draft ID.', 'WPGatsby' ),
					],
					'userDatabaseId'     => [
						'type' => 'Int',
						'description' => __( 'The database ID of the user who made the original preview.', 'WPGatsby' ),
					],
					'id'         => [
						'type' => 'ID',
						'description' => __( 'The Relay id of the previewed node.', 'WPGatsby' ),
					],
					'singleName' => [
						'type' => 'String',
						'description' => __( 'The GraphQL single field name for the type of the preview.', 'WPGatsby' ),
					],
					'isDraft'    => [
						'type' => 'Boolean',
						'description' => __( 'Wether or not the preview is a draft.', 'WPGatsby' ),
					],
					'remoteUrl'  => [
						'type' => 'String',
						'description' => __( 'The WP url at the time of the preview.', 'WPGatsby' ),
					],
					'modified'   => [
						'type' => 'String',
						'description' => __( 'The modified time of the previewed node.', 'WPGatsby' ),
					],
					'parentDatabaseId'   => [
						'type' => 'Int',
						'description' => __( 'The WordPress database ID of the preview. If this is a draft it will potentially return 0, if it\'s a revision of a post, it will return the ID of the original post that this is a revision of.', 'WPGatsby' ),
					],
					'manifestIds' => [
						'type' => [ 'list_of' => 'String' ],
						'description' => __( 'A list of manifest ID\'s a preview action has seen during it\'s lifetime.', 'WPGatsby' ),
					]
				]
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
				},
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
				},
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
				},
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
				},
			]
		);

		register_graphql_field(
			'RootQueryToActionMonitorActionConnectionWhereArgs',
			'sinceTimestamp',
			[
				'type'        => 'Number',
				'description' => 'List Actions performed since a timestamp.',
			]
		);

		// @todo write a test for this previewStream input arg
		register_graphql_field(
			'RootQueryToActionMonitorActionConnectionWhereArgs',
			'previewStream',
			[
				'type'        => 'boolean',
				'description' => 'List Actions of the PREVIEW stream type.',
			]
		);

		add_filter(
			'graphql_post_object_connection_query_args',
			function( $args ) {
				$sinceTimestamp = $args['sinceTimestamp'] ?? null;

				if ( $sinceTimestamp ) {
					$args['date_query'] = [
						[
							'after'  =>  gmdate(
								'Y-m-d H:i:s',
								$sinceTimestamp / 1000
							),
							'column' => 'post_modified_gmt',
						],
					];
				}

				return $args;
			}
		);

		add_filter(
			'graphql_post_object_connection_query_args',
			function( $args ) {
				$previewStream = $args['previewStream'] ?? false;

				if ( $previewStream ) {
					$args['tax_query'] = [
						[
							'taxonomy' => 'gatsby_action_stream_type',
							'field' => 'slug',
							'terms' => 'preview',
						],
					];
				}

				return $args;
			}
		);
	}

	/**
	 * Add post meta to schema
	 */
	function register_graphql_fields() {
		$this->register_post_graphql_fields();
	}

	/**
	 * Triggers the dispatch to the remote endpoint(s)
	 */
	public function trigger_dispatch() {
		$build_webhook_field   = Settings::prefix_get_option( 'builds_api_webhook', 'wpgatsby_settings', false );
		$preview_webhook_field = Settings::prefix_get_option( 'preview_api_webhook', 'wpgatsby_settings', false );

		$should_call_build_webhooks =
			$build_webhook_field &&
			$this->should_dispatch;

		$we_should_call_preview_webhooks =
			$preview_webhook_field &&
			$this->should_dispatch;

		if ( $should_call_build_webhooks ) {
			$webhooks = explode( ',', $build_webhook_field );

			$truthy_webhooks = array_filter( $webhooks );
			$unique_webhooks = array_unique( $truthy_webhooks );

			foreach ( $unique_webhooks as $webhook ) {
				$args = apply_filters( 'gatsby_trigger_dispatch_args', [], $webhook );

				wp_safe_remote_post( $webhook, $args );
			}
		}

		if ( $we_should_call_preview_webhooks ) {
			$webhooks = explode( ',', $preview_webhook_field );

			$truthy_webhooks = array_filter( $webhooks );
			$unique_webhooks = array_unique( $truthy_webhooks );

			foreach ( $unique_webhooks as $webhook ) {
				$token = \WPGatsby\GraphQL\Auth::get_token();

				// For preview webhooks we send the token
				// because this is a build but
				// we want it to source any pending previews
				// in case someone pressed preview right after
				// we got to this point from someone else pressing
				// publish/update.
				$graphql_endpoint = apply_filters( 'graphql_endpoint', 'graphql' );
				$graphql_url = get_site_url() . '/' . ltrim( $graphql_endpoint, '/' );
				
				$post_body = apply_filters(
					'gatsby_trigger_preview_build_dispatch_post_body',
					[
						'token' => $token,
						'userDatabaseId' => get_current_user_id(),
						'remoteUrl' => $graphql_url
					]
				);

				$args = apply_filters(
					'gatsby_trigger_preview_build_dispatch_args',
					[
						'body'        => wp_json_encode( $post_body ),
						'headers'     => [
							'Content-Type' => 'application/json; charset=utf-8',
						],
						'method'      => 'POST',
						'data_format' => 'body',
					],
					$webhook 
				);

				wp_safe_remote_post( $webhook, $args );
			}
		}
	}
}
