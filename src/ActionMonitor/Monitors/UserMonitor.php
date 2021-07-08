<?php

namespace WPGatsby\ActionMonitor\Monitors;

use GraphQLRelay\Relay;

class UserMonitor extends Monitor {

	/**
	 * The user object before deletion
	 *
	 * @var array<int, array{user:\WP_User|false, reassign:\WP_User|null}>
	 */
	protected $users_before_delete;

	/**
	 * IDs of posts to reassign
	 *
	 * @var array<string>
	 */
	protected $post_ids_to_reassign;

	/**
	 * Initialize UserMonitor Actions
	 *
	 * @return void
	 */
	public function init() {

		$this->post_ids_to_reassign = [];

		add_action( 'profile_update', [ $this, 'callback_profile_update' ], 10, 1 );
		add_action( 'delete_user', [ $this, 'callback_delete_user' ], 10, 2 );
		add_action( 'deleted_user', [ $this, 'callback_deleted_user' ], 10, 1 );
		add_action( 'updated_user_meta', [ $this, 'callback_updated_user_meta' ], 10, 4 );
		add_action( 'added_user_meta', [ $this, 'callback_updated_user_meta' ], 10, 4 );
		add_action( 'deleted_user_meta', [ $this, 'callback_deleted_user_meta' ], 10, 4 );

	}

	/**
	 * This method accepts a user ID, and checks if the user has published posts
	 * of any of the tracked post types
	 *
	 * @param int $user_id The ID of the user to check
	 *
	 * @return bool
	 */
	public function is_published_author( int $user_id ) {

		$post_types            = $this->action_monitor->get_tracked_post_types();
		$published_posts_count = count_user_posts( $user_id, $post_types );

		if ( empty( $published_posts_count ) ) {
			return false;
		}

		return true;

	}

	/**
	 * Determines whether the meta should be tracked or not.
	 *
	 * User meta is all untracked other than a few specific keys. Plugins and themes that
	 * expose user meta intended for public display will need to filter this to
	 * have updates to those meta fields trigger updates with Gatsby.
	 *
	 * @param string $meta_key Metadata key.
	 * @param mixed $meta_value Metadata value. Serialized if non-scalar.
	 * @param object $object The object the metadata is for.
	 *
	 * @return bool
	 */
	public function should_track_meta( string $meta_key, $meta_value, $object ) {

		$tracked_meta_keys = [
			'description',
			'nickname',
			'firstName',
			'lastName',
		];

		$tracked_meta_keys = apply_filters( 'gatsby_action_monitor_tracked_user_meta_keys', $tracked_meta_keys, $meta_key, $meta_value, $object );

		if ( in_array( $meta_key, $tracked_meta_keys, true ) ) {
			return true;
		}

		return false;

	}

	/**
	 * Log action when a user is updated.
	 *
	 * @param int $user_id
	 */
	public function callback_profile_update( int $user_id ) {

		if ( empty( $user_id ) ) {
			return;
		}

		$user = get_user_by( 'id', $user_id );

		if ( ! $user instanceof \WP_User || $user_id !== $user->ID ) {
			return;
		}

		if ( ! $this->is_published_author( $user_id ) ) {
			return;
		}

		$this->log_action(
			[
				'action_type'         => 'UPDATE',
				'title'               => $user->display_name,
				'node_id'             => (int) $user->ID,
				'relay_id'            => Relay::toGlobalId( 'user', (int) $user->ID ),
				'graphql_single_name' => 'user',
				'graphql_plural_name' => 'users',
				'status'              => 'publish',
			]
		);

	}

	/**
	 * There's no logging in this callback's action, the reason
	 * behind this hook is so that we can store user objects before
	 * being deleted.
	 *
	 * During `deleted_user` hook, our callback
	 * receives $user_id param but it's useless as the user record
	 * was already removed from DB.
	 *
	 * @param mixed|int|null $user_id     User ID that may be deleted
	 * @param mixed|int|null $reassign_id User ID that posts should be reassigned to
	 */
	public function callback_delete_user( $user_id, $reassign_id ) {

		if ( empty( $user_id ) ) {
			return;
		}

		if ( ! $this->is_published_author( $user_id ) ) {
			return;
		}

		// Get the user the posts should be re-assigned to
		$reassign_user = ! empty( $reassign_id ) ? get_user_by( 'id', $reassign_id ) : null;

		if ( ! empty( $reassign_user ) ) {

			// @todo: We should get rid of this as it can get expensive to log these actions.
			// Gatsby Source WordPress should have support for bulk-actions so we can log a single action
			// such as "DELETE_AUTHOR_AND_REASSIGN_POSTS" and pass the old author ID and new author ID and
			// Gatsby could do it without an action per modified post.
			global $wpdb;
			$post_types = $this->action_monitor->get_tracked_post_types();
			$post_types = implode( "', '", $post_types );
			$post_ids   = $wpdb->get_col( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_author = %d AND post_status = 'publish' AND post_type IN ('$post_types')", $user_id ) );

			if ( ! empty( $post_ids ) && is_array( $post_ids ) ) {
				$this->post_ids_to_reassign = array_merge( $this->post_ids_to_reassign, $post_ids );
			}
		}

		$this->users_before_delete[ (int) $user_id ] = [
			'user'     => get_user_by( 'id', (int) $user_id ),
			'reassign' => ! empty( $reassign_user ) && $reassign_user instanceof \WP_User ? $reassign_user : null,
		];
	}

	/**
	 * Log deleted user.
	 *
	 * @param int $user_id Deleted user ID
	 */
	public function callback_deleted_user( int $user_id ) {

		$before_delete = isset( $this->users_before_delete[ (int) $user_id ] ) ? $this->users_before_delete[ (int) $user_id ] : null;

		if ( empty( $before_delete ) || ! isset( $before_delete['user']->data->display_name ) ) {
			return;
		}

		$this->log_action(
			[
				'action_type'         => 'DELETE',
				'title'               => $before_delete['user']->data->display_name,
				'node_id'             => (int) $before_delete['user']->ID,
				'relay_id'            => Relay::toGlobalId( 'user', (int) $before_delete['user']->ID ),
				'graphql_single_name' => 'user',
				'graphql_plural_name' => 'users',
				'status'              => 'trash',
			]
		);

		if ( isset( $before_delete['reassign']->display_name ) ) {
			$this->log_action(
				[
					'action_type'         => 'UPDATE',
					'title'               => $before_delete['reassign']->display_name,
					'node_id'             => (int) $before_delete['reassign']->ID,
					'relay_id'            => Relay::toGlobalId( 'user', (int) $before_delete['reassign']->ID ),
					'graphql_single_name' => 'user',
					'graphql_plural_name' => 'users',
					'status'              => 'publish',
				]
			);

			if ( ! empty( $this->post_ids_to_reassign ) && is_array( $this->post_ids_to_reassign ) ) {

				foreach ( $this->post_ids_to_reassign as $post_id ) {

					// If there's a post for the Post ID
					if ( ! empty( $post = get_post( absint( $post_id ) ) ) ) {

						// If the post status is not published, don't track an action for it
						if ( 'publish' !== $post->post_status ) {
							return;
						}

						// Get the post type object
						$post_type_object = get_post_type_object( $post->post_type );

						// Log an action for the post being re-assigned
						$this->log_action(
							[
								'action_type'         => 'UPDATE',
								'title'               => $post->post_title,
								'node_id'             => (int) $post_id,
								'relay_id'            => Relay::toGlobalId( 'post', (int) $post_id ),
								'graphql_single_name' => $post_type_object->graphql_single_name,
								'graphql_plural_name' => $post_type_object->graphql_plural_name,
								'status'              => 'publish',
							]
						);

					}
				}
			}
		}

	}

	/**
	 * Logs activity when meta is updated for a user
	 *
	 * @param int    $meta_id    ID of updated metadata entry.
	 * @param int    $object_id  ID of the object metadata is for.
	 * @param string $meta_key   Metadata key.
	 * @param mixed  $meta_value Metadata value. Serialized if non-scalar.
	 */
	public function callback_updated_user_meta( int $meta_id, int $object_id, string $meta_key, $meta_value ) {

		if ( empty( $user = get_user_by( 'id', $object_id ) ) || ! is_a( $user, 'WP_User' ) ) {
			return;
		}

		if ( ! $this->is_published_author( $object_id ) ) {
			return;
		}

		if ( false === $this->should_track_meta( $meta_key, $meta_value, $user ) ) {
			return;
		}

		$action = [
			'action_type'         => 'UPDATE',
			'title'               => $user->display_name,
			'node_id'             => (int) $user->ID,
			'relay_id'            => Relay::toGlobalId( 'user', (int) $user->ID ),
			'graphql_single_name' => 'user',
			'graphql_plural_name' => 'users',
			'status'              => 'publish',
		];

		// Log the action
		$this->log_action( $action );

	}

	/**
	 * Logs activity when meta is updated on terms
	 *
	 * @param string[] $meta_ids   An array of metadata entry IDs to delete.
	 * @param int      $object_id  ID of the object metadata is for.
	 * @param string   $meta_key   Metadata key.
	 * @param mixed    $meta_value Metadata value. Serialized if non-scalar.
	 */
	public function callback_deleted_user_meta( array $meta_ids, int $object_id, string $meta_key, $meta_value ) {

		if ( empty( $user = get_user_by( 'id', $object_id ) ) || ! is_a( $user, 'WP_User' ) ) {
			return;
		}

		if ( ! $this->is_published_author( $object_id ) ) {
			return;
		}

		if ( ! $this->should_track_meta( $meta_key, $meta_value, $user ) ) {
			return;
		}

		$action = [
			'action_type'         => 'UPDATE',
			'title'               => $user->display_name,
			'node_id'             => (int) $user->ID,
			'relay_id'            => Relay::toGlobalId( 'user', (int) $user->ID ),
			'graphql_single_name' => 'user',
			'graphql_plural_name' => 'users',
			'status'              => 'publish',
		];

		// Log the action
		$this->log_action( $action );

	}
}
