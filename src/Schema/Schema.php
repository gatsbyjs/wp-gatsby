<?php

namespace WPGatsby\Schema;

use WPGatsby\AllIds\AllIds;

/**
 * Modifies the schema
 */
class Schema {
	/**
	 *
	 */
	function __construct() {
		new SiteMeta();
		new WPGatsbyWPGraphQLSchemaChanges();
		new AllIds;
	}
}
