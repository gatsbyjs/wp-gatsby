<?php
namespace WPGatsby\ActionMonitor\Monitors;

class TaxonomyMonitor extends Monitor {

	/**
	 * @var array List of registered taxonomies that Gatsby tracks
	 */
	public $current_taxonomies;

	/**
	 * @var array List of taxonomies that were previously registered
	 */
	public $prev_taxonomies;

	/**
	 * @var string The option name that's used to cache the tracked taxonomies
	 */
	public $option_name;

	/**
	 * Initialize the TaxonomyMonitor
	 *
	 * @return mixed|void
	 */
	public function init() {

		// Set the option name that's used to cache taxonomies
		$this->option_name = '_gatsby_tracked_taxonomies';

		// Check to see if the taxonomies are different
		add_action( 'gatsby_init_action_monitors', [ $this, 'check_taxonomies' ], 999 );

	}

	/**
	 * Check taxonomies and trigger a Schema diff if detected
	 */
	public function check_taxonomies() {

		$this->current_taxonomies = array_keys( $this->action_monitor->get_tracked_taxonomies() );
		$this->prev_taxonomies    = get_option( $this->option_name, [] );

		if ( empty( $this->prev_taxonomies ) ) {
			update_option( $this->option_name, $this->current_taxonomies );
			return;
		}

		/**
		 * If the current_taxonomies and prev_taxonomies do not match,
		 * update the option and cache the tracked taxonomies
		 */
		if ( $this->current_taxonomies === $this->prev_taxonomies ) {
			return;
		}

		update_option( $this->option_name, $this->current_taxonomies );

		// Check for added taxonomies
		$added = array_diff( $this->current_taxonomies, $this->prev_taxonomies );

		// Check for removed taxonomies
		$removed = array_diff( $this->prev_taxonomies, $this->current_taxonomies );

		// if there are
		if ( ! empty( $added ) ) {
			$this->trigger_schema_diff(
				[
					'title' => __( 'Taxonomy added', 'WPGatsby' ),
				]
			);
		}

		if ( ! empty( $removed ) ) {
			$this->trigger_schema_diff(
				[
					'title' => __( 'Taxonomy removed', 'WPGatsby' ),
				]
			);
		}
	}

}
