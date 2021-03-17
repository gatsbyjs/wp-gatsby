<?php

namespace WPGatsby\ActionMonitor\Monitors;

use GraphQLRelay\Relay;
use WP_Taxonomy;
use WP_Term;

class TermMonitor extends Monitor {

	/**
	 * Caches terms before they're deleted
	 *
	 * @var array
	 */
	public $terms_before_delete = [];

	/**
	 * @return mixed|void
	 */
	public function init() {

		add_action( 'created_term', [ $this, 'callback_created_term' ], 10, 3 );
		add_action( 'pre_delete_term', [ $this, 'callback_pre_delete_term' ], 10, 2 );
		add_action( 'delete_term', [ $this, 'callback_delete_term' ], 10, 4 );
		add_action( 'edited_term', [ $this, 'callback_edited_term' ], 10, 3 );
		add_action( 'added_term_meta', [ $this, 'callback_updated_term_meta' ], 10, 4 );
		add_action( 'updated_term_meta', [ $this, 'callback_updated_term_meta' ], 10, 4 );
		add_action( 'deleted_term_meta', [ $this, 'callback_deleted_term_meta' ], 10, 4 );

	}

	/**
	 * Whether the taxonomy is tracked
	 *
	 * @param string $taxonomy The name of the taxonomy to check
	 *
	 * @return bool
	 */
	public function is_taxonomy_tracked( string $taxonomy ) {
		return in_array( $taxonomy, $this->action_monitor->get_tracked_taxonomies(), true );
	}

	/**
	 * Tracks creation of terms
	 *
	 * @param int    $term_id  Term ID.
	 * @param int    $tt_id    Taxonomy term ID.
	 * @param string $taxonomy Taxonomy name.
	 */
	public function callback_created_term( int $term_id, int $tt_id, string $taxonomy ) {

		$tax_object = get_taxonomy( $taxonomy );

		// If the term is in a taxonomy that's not being tracked, ignore it
		if ( false === $tax_object || ! $this->is_taxonomy_tracked( $taxonomy ) ) {
			return;
		}

		$term = get_term( $term_id, $taxonomy );

		if ( ! is_a( $term, 'WP_Term' ) ) {
			return;
		}

		$this->log_action(
			[
				'action_type'         => 'CREATE',
				'title'               => $term->name,
				'node_id'             => $term->term_id,
				'relay_id'            => Relay::toGlobalId( 'term', $term->term_id ),
				'graphql_single_name' => $tax_object->graphql_single_name,
				'graphql_plural_name' => $tax_object->graphql_plural_name,
				'status'              => 'publish',
			]
		);

		if ( true === $tax_object->hierarchical ) {
			$this->update_hierarchical_relatives( $term, $tax_object );
		}

	}

	/**
	 * @param int $term_id The ID of the term object being deleted
	 * @param string $taxonomy The name of the taxonomy of the term being deleted
	 */
	public function callback_pre_delete_term( int $term_id, string $taxonomy ) {

		$term = get_term_by( 'id', $term_id, $taxonomy );

		if ( ! $term instanceof WP_Term ) {
			return;
		}

		$before_delete = [
			'term' => $term,
		];

		if ( true === get_taxonomy( $taxonomy )->hierarchical ) {
			$term_children = get_term_children( $term->term_id, $taxonomy );
			if ( ! empty( $term_children ) ) {
				$before_delete['children'] = $term_children;
			}
		}

		$this->terms_before_delete[ $term->term_id ] = $before_delete;
	}

	/**
	 * Tracks deletion of taxonomy terms
	 *
	 * @param int    $term_id      Term ID.
	 * @param int    $tt_id        Taxonomy term ID.
	 * @param string $taxonomy     Taxonomy name.
	 * @param mixed  $deleted_term Deleted term object.
	 */
	public function callback_delete_term( int $term_id, int $tt_id, string $taxonomy, $deleted_term ) {

		$tax_object = get_taxonomy( $taxonomy );

		if ( false === $tax_object || ! $this->is_taxonomy_tracked( $taxonomy ) ) {
			return;
		}

		$this->log_action(
			[
				'action_type'         => 'DELETE',
				'title'               => $deleted_term->name,
				'node_id'             => $deleted_term->term_id,
				'relay_id'            => Relay::toGlobalId( 'term', $deleted_term->term_id ),
				'graphql_single_name' => $tax_object->graphql_single_name,
				'graphql_plural_name' => $tax_object->graphql_plural_name,
				'status'              => 'trash',
			]
		);

		if ( true === $tax_object->hierarchical ) {
			$this->update_hierarchical_relatives( $deleted_term, $tax_object );
		}

	}

	/**
	 * Tracks updated of taxonomy terms
	 *
	 * @param int    $term_id  Term ID.
	 * @param int    $tt_id    Taxonomy term ID.
	 * @param string $taxonomy Taxonomy name.
	 */
	public function callback_edited_term( int $term_id, int $tt_id, string $taxonomy ) {

		$tax_object = get_taxonomy( $taxonomy );

		if ( false === $tax_object || ! $this->is_taxonomy_tracked( $taxonomy ) ) {
			return;
		}

		$term = get_term( $term_id, $taxonomy );

		$this->log_action(
			[
				'action_type'         => 'UPDATE',
				'title'               => $term->name,
				'node_id'             => $term->term_id,
				'relay_id'            => Relay::toGlobalId( 'term', $term->term_id ),
				'graphql_single_name' => $tax_object->graphql_single_name,
				'graphql_plural_name' => $tax_object->graphql_plural_name,
				'status'              => 'publish',
			]
		);

		if ( true === $tax_object->hierarchical ) {
			$this->update_hierarchical_relatives( $term, $tax_object );
		}

	}

	public function update_hierarchical_relatives( WP_Term $term, WP_Taxonomy $tax_object ) {

		$taxonomy = $tax_object->name;

		if ( true === $tax_object->hierarchical ) {

			if ( ! empty( $term->parent ) ) {

				$parent = get_term_by( 'id', absint( $term->parent ), $taxonomy );

				if ( is_a( $parent, 'WP_Term' ) ) {
					$this->log_action(
						[
							'action_type'         => 'UPDATE',
							'title'               => $parent->name . ' Parent',
							'node_id'             => $parent->term_id,
							'relay_id'            => Relay::toGlobalId( 'term', $parent->term_id ),
							'graphql_single_name' => $tax_object->graphql_single_name,
							'graphql_plural_name' => $tax_object->graphql_plural_name,
							'status'              => 'publish',
						]
					);
				}
			}

			if ( isset( $this->terms_before_delete[ $term->term_id ]['children'] ) ) {

				$child_ids = $this->terms_before_delete[ $term->term_id ]['children'];

			} else {
				$child_ids = get_term_children( $term->term_id, $taxonomy );
			}

			if ( ! empty( $child_ids ) && is_array( $child_ids ) ) {
				foreach ( $child_ids as $child_term_id ) {

					$child_term = get_term_by( 'id', $child_term_id, $taxonomy );

					if ( ! empty( $child_term ) ) {

						$this->log_action(
							[
								'action_type'         => 'UPDATE',
								'title'               => $child_term->name . ' Parent',
								'node_id'             => $child_term->term_id,
								'relay_id'            => Relay::toGlobalId( 'term', $child_term->term_id ),
								'graphql_single_name' => $tax_object->graphql_single_name,
								'graphql_plural_name' => $tax_object->graphql_plural_name,
								'status'              => 'publish',
							]
						);

					}
				}
			}
		}

	}

	/**
	 * Logs activity when meta is updated on terms
	 *
	 * @param int $meta_id ID of updated metadata entry.
	 * @param int $object_id ID of the object metadata is for.
	 * @param string $meta_key Metadata key.
	 * @param mixed $meta_value Metadata value. Serialized if non-scalar.
	 */
	public function callback_updated_term_meta( int $meta_id, int $object_id, string $meta_key, $meta_value ) {

		if ( empty( $term = get_term( $object_id ) ) || ! is_a( $term, 'WP_Term' ) ) {
			return;
		}

		$tax_object = get_taxonomy( $term->taxonomy );

		// If the updated term is of a post type that isn't being tracked, do nothing
		if ( false === $tax_object || ! $this->is_taxonomy_tracked( $term->taxonomy ) ) {
			return;
		}

		if ( false === $this->should_track_meta( $meta_key, $meta_value, $term ) ) {
			return;
		}

		$action = [
			'action_type'         => 'UPDATE',
			'title'               => $term->name,
			'node_id'             => $term->term_id,
			'relay_id'            => Relay::toGlobalId( 'term', $term->term_id ),
			'graphql_single_name' => $tax_object->graphql_single_name,
			'graphql_plural_name' => $tax_object->graphql_plural_name,
			'status'              => 'publish',
		];

		// Log the action
		$this->log_action( $action );

	}

	/**
	 * Logs activity when meta is updated on terms
	 *
	 * @param string[] $meta_ids    An array of metadata entry IDs to delete.
	 * @param int      $object_id   ID of the object metadata is for.
	 * @param string   $meta_key    Metadata key.
	 * @param mixed    $meta_value Metadata value. Serialized if non-scalar.
	 */
	public function callback_deleted_term_meta( array $meta_ids, int $object_id, string $meta_key, $meta_value ) {

		if ( empty( $term = get_term( $object_id ) ) || ! is_a( $term, 'WP_Term' ) ) {
			return;
		}

		$tax_object = get_taxonomy( $term->taxonomy );

		// If the updated term is of a post type that isn't being tracked, do nothing
		if ( false === $tax_object || ! $this->is_taxonomy_tracked( $term->taxonomy ) ) {
			return;
		}

		if ( false === $this->should_track_meta( $meta_key, $meta_value, $term ) ) {
			return;
		}

		$action = [
			'action_type'         => 'UPDATE',
			'title'               => $term->name,
			'node_id'             => $term->term_id,
			'relay_id'            => Relay::toGlobalId( 'term', $term->term_id ),
			'graphql_single_name' => $tax_object->graphql_single_name,
			'graphql_plural_name' => $tax_object->graphql_plural_name,
			'status'              => 'publish',
		];

		// Log the action
		$this->log_action( $action );

	}

}
