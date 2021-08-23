<?php
namespace WPGatsby\ActionMonitor\Monitors;

use GraphQLRelay\Relay;
use WPGatsby\ActionMonitor\ActionMonitor;
use WPGatsby\Admin\Preview;

abstract class Monitor {

	/**
	 * @var ActionMonitor
	 */
	protected $action_monitor;

	/**
	 * @var array
	 */
	protected $tracked_events = [];

	/**
	 * @var array
	 */
	protected $ignored_ids = [];

	/**
	 * Monitor constructor.
	 *
	 * @param ActionMonitor $action_monitor
	 */
	public function __construct( ActionMonitor $action_monitor ) {
		$this->action_monitor = $action_monitor;
		$this->init();
	}

	/**
	 * Allows IDs to be set that will be ignored by the logger
	 *
	 * @param int[] $ids Array of database IDs to ignore logging for
	 */
	public function set_ignored_ids( array $ids ) {
		if ( ! empty( $ids ) && is_array( $ids ) ) {
			$this->ignored_ids = array_merge( $this->ignored_ids, $ids );
		}
	}

	/**
	 * Given an array of IDs, this removes them from the list of ignored IDs
	 *
	 * @param array $ids
	 */
	public function unset_ignored_ids( array $ids ) {
		if ( ! empty( $ids ) && is_array( $ids ) ) {
			foreach ( $ids as $id ) {
				if ( isset( $this->ignored_ids[ $id ] ) ) {
					unset( $this->ignored_ids[ $id ] );
				}
			}
		}
	}

	/**
	 * Resets the ignored IDs to an empty array
	 */
	public function reset_ignored_ids() {
		$this->ignored_ids = [];
	}

	/**
	 * Trigger action for non node root field updates
	 *
	 * @param array $args Optional args to pass to the action
	 */
	public function trigger_non_node_root_field_update( array $args = [] ) {

		$default = [
			'action_type'         => 'NON_NODE_ROOT_FIELDS',
			'title'               => 'Non node root field changed',
			'node_id'             => 'update_non_node_root_field',
			'relay_id'            => 'update_non_node_root_field',
			'graphql_single_name' => 'update_non_node_root_field',
			'graphql_plural_name' => 'update_non_node_root_field',
			'status'              => 'update_non_node_root_field',
		];

		$this->log_action( array_merge( $default, $args ) );

	}

	/**
	 * Trigger action to refetch everything
	 *
	 * @param array $args Optional args to pass to the action
	 */
	public function trigger_refetch_all( $args = [] ) {

		$default = [
			'action_type'         => 'REFETCH_ALL',
			'title'               => 'Something changed (such as permalink structure) that requires everything to be refetched',
			'node_id'             => 'refetch_all',
			'relay_id'            => 'refetch_all',
			'graphql_single_name' => 'refetch_all',
			'graphql_plural_name' => 'refetch_all',
			'status'              => 'refetch_all',
		];

		$this->log_action( array_merge( $default, $args ) );

	}

	/**
	 * Determines whether the meta should be tracked or not
	 *
	 * @param string $meta_key Metadata key.
	 * @param mixed $meta_value Metadata value. Serialized if non-scalar.
	 * @param object $object The object the metadata is for.
	 *
	 * @return bool
	 */
	protected function should_track_meta( string $meta_key, $meta_value, $object ) {

		/**
		 * This filter allows plugins to opt-in or out of tracking for meta.
		 *
		 * @param bool $should_track Whether the meta key should be tracked.
		 * @param string $meta_key Metadata key.
		 * @param int $meta_id ID of updated metadata entry.
		 * @param mixed $meta_value Metadata value. Serialized if non-scalar.
		 * @param mixed $object The object the meta is being updated for.
		 *
		 * @param bool $tracked whether the meta key is tracked by Gatsby Action Monitor
		 */
		$should_track = apply_filters( 'gatsby_action_monitor_should_track_meta', null, $meta_key, $meta_value, $object );

		// If the filter has been applied return it
		if ( null !== $should_track ) {
			return (bool) $should_track;
		}

		// If the meta key starts with an underscore, don't track it
		if ( '_' === substr( $meta_key, 0, 1 ) ) {
			return false;
		}

		return true;

	}

	/**
	 * Inserts an action that triggers Gatsby Source WordPress to diff the Schemas.
	 *
	 * This can be used for plugins such as Custom Post Type UI, Advanced Custom Fields, etc that
	 * alter the Schema in some way.
	 *
	 * @param array $args Optional args to add to the action
	 */
	public function trigger_schema_diff( $args = [] ) {

		$default             = [
			'title'               => __( 'Diff schemas', 'WPGatsby' ),
			'node_id'             => 'none',
			'relay_id'            => 'none',
			'graphql_single_name' => 'none',
			'graphql_plural_name' => 'none',
			'status'              => 'none',
		];
		$args                = array_merge( $default, $args );
		$args['action_type'] = 'DIFF_SCHEMAS';
		$this->log_action( $args );
	}

	/**
	 * Insert new action
	 *
	 * $args = [$action_type, $title, $status, $node_id, $relay_id, $graphql_single_name,
	 * $graphql_plural_name]
	 *
	 * @param array $args Array of arguments to configure the action to be inserted
	 *
	 */
	public function log_action( array $args ) {

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

		/**
		 * Filter to allow skipping a logged action. If set to false, the action will not be logged.
		 *
		 * @param null|bool $enable    Whether the action should be logged
		 * @param array     $arguments The args to log
		 * @param Monitor   $monitor   Instance of the Monitor
		 */
		$pre_log_action = apply_filters( 'gatsby_pre_log_action_monitor_action', null, $args, $this );

		if ( null !== $pre_log_action ) {
			if ( false === $pre_log_action ) {
				return;
			}
		}

		// If the node_id is set to be ignored, don't create a log
		if ( in_array( $args['node_id'], $this->ignored_ids, true ) ) {
			return;
		}

		$should_dispatch =
			! isset( $args['skip_webhook'] ) || ! $args['skip_webhook'];

		$time = time();

		$node_type = 'unknown';
		if ( isset( $args['graphql_single_name'] ) ) {
			$node_type = $args['graphql_single_name'];
		} elseif ( isset( $args['relay_id'] ) ) {
			$id_parts = Relay::fromGlobalId( $args['relay_id'] );
			if ( ! isset( $id_parts['type'] ) ) {
				$node_type = $id_parts['type'];
			}
		}

		$stream_type = ( $args['stream_type'] ?? null ) === 'PREVIEW'
			? 'PREVIEW'
			: 'CONTENT';

		$is_preview_stream = $stream_type === 'PREVIEW';

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
				[
					'taxonomy' => 'gatsby_action_stream_type',
					'field'    => 'name',
					'terms'    => $stream_type,
				]
			],
		] );

		// If there's already an action logged for this node, update the record
		if ( isset( $existing->posts ) && ! empty( $existing->posts ) ) {

			$existing_id            = $existing->posts[0];
			$action_monitor_post_id = wp_update_post( [
				'ID'           => absint( $existing_id ),
				'post_title'   => $args['title'],
				'post_content' => wp_json_encode( $args ),
			] );

		} else {

			$action_monitor_post_id = \wp_insert_post(
				[
					'post_title'   => $args['title'],
					'post_type'    => 'action_monitor',
					'post_status'  => 'private',
					'author'       => -1,
					'post_name'    => sanitize_title( "{$args['title']}-{$time}" ),
					'post_content' => wp_json_encode( $args ),
				]
			);

			wp_set_object_terms( $action_monitor_post_id, sanitize_text_field( $args['node_id'] ), 'gatsby_action_ref_node_dbid' );
			wp_set_object_terms( $action_monitor_post_id, sanitize_text_field( $node_type ), 'gatsby_action_ref_node_type' );

		}

		wp_set_object_terms( $action_monitor_post_id, sanitize_text_field( $args['relay_id'] ), 'gatsby_action_ref_node_id' );
		wp_set_object_terms( $action_monitor_post_id, $args['action_type'], 'gatsby_action_type' );
		wp_set_object_terms( $action_monitor_post_id, $stream_type, 'gatsby_action_stream_type' );

		if ( $action_monitor_post_id !== 0 ) {

			if ( isset( $args['preview_data'] ) ) {
				$existing_preview_data = \get_post_meta(
					$action_monitor_post_id,
					'_gatsby_preview_data',
					true
				);

				$manifest_id = Preview::get_preview_manifest_id_for_post(
					get_post( $args['node_id'] )
				);

				$manifest_ids = [$manifest_id];

				// if we have existing data, we want to merge our manifest id
				// into any existing manifest ids
				if ( $existing_preview_data && $existing_preview_data !== "" ) {
					$existing_preview_data = json_decode( $existing_preview_data );

					if ( $existing_preview_data->manifestIds ?? false ) {
						$manifest_ids = array_unique(
							array_merge(
								$existing_preview_data->manifestIds,
								$manifest_ids
							)
						);
					}
				}

				// add manifest ids
				$preview_data = json_decode( $args['preview_data'] );
				$preview_data->manifestIds = $manifest_ids;
				$preview_data = json_encode( $preview_data );
				
				\update_post_meta(
					$action_monitor_post_id,
					'_gatsby_preview_data',
					$preview_data
				);
			}

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

			// preview actions should remain private
			if ( !$is_preview_stream ) {
				\wp_update_post( [
					'ID'          => $action_monitor_post_id,
					'post_status' => 'publish'
				] );
			}

		}

		// If $should_dispatch is not set to false, schedule a dispatch. Actions being logged that
		// set $should_dispatch to false will be logged, but not trigger a webhook immediately.
		// if this is a preview we should always not dispatch
		if ( $should_dispatch && ! $is_preview_stream ) {
			// we've saved at least 1 action, so we should update
			// but only if this isn't a preview
			// previews will dispatch on their own
			$this->action_monitor->schedule_dispatch();
		}

		// Delete old actions
		$this->action_monitor->garbage_collect_actions();

	}


	/**
	 * Initialize the Monitor
	 *
	 * @return mixed
	 */
	abstract public function init();

}
