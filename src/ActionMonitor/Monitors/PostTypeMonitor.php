<?php
namespace WPGatsby\ActionMonitor\Monitors;

class PostTypeMonitor extends Monitor {

	/**
	 * @var array List of registered post types that Gatsby tracks
	 */
	public $current_post_types;

	/**
	 * @var array List of post types that were previously registered
	 */
	public $prev_post_types;

	/**
	 * @var string The option name that's used to cache the tracked post types
	 */
	public $option_name;

	/**
	 * Initialize the PostTypeMonitor
	 *
	 * @return mixed|void
	 */
	public function init() {

		// Set the option name that's used to cache post types
		$this->option_name = '_gatsby_tracked_post_types';

		// Check to see if the post types are different
		add_action( 'gatsby_init_action_monitors', [ $this, 'check_post_types' ], 999 );

	}

	/**
	 * Check post types and trigger a Schema diff if detected
	 */
	public function check_post_types() {

		$this->current_post_types = array_keys( $this->action_monitor->get_tracked_post_types() );
		$this->prev_post_types    = get_option( $this->option_name, [] );

		if ( empty( $this->prev_post_types ) ) {
			update_option( $this->option_name, $this->current_post_types );
			return;
		}

		/**
		 * If the current_post_types and prev_post_types do not match,
		 * update the option and cache the tracked post types
		 */
		if ( $this->current_post_types === $this->prev_post_types ) {
			return;
		}

		update_option( $this->option_name, $this->current_post_types );

		// Check for added post types
		$added = array_diff( $this->current_post_types, $this->prev_post_types );

		// Check for removed post types
		$removed = array_diff( $this->prev_post_types, $this->current_post_types );

		// if there are
		if ( ! empty( $added ) ) {
			$this->trigger_schema_diff(
				[
					'title' => __( 'Post Type added', 'WPGatsby' ),
				]
			);
		}

		if ( ! empty( $removed ) ) {
			$this->trigger_schema_diff(
				[
					'title' => __( 'Post type removed', 'WPGatsby' ),
				]
			);
		}
	}

}
