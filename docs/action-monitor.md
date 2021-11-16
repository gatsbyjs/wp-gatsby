# Activity Monitor

WPGatsby monitors activity that occurs in your WordPress site and notifies your Gatsby site
of the changes, allowing your Gatsby site to stay in sync with your WordPress site.

This document covers how WPGatsby tracks activity, what activity is tracked and how to customize the
activity tracking.

## How does WPGatsby track activity?

WPGatsby listens for CRUD (create, read, update and delete) actions that occur in WordPress, such as
publishing or deleting a post, updating menus, and more.

WPGatsby uses common WordPress actions to capture the objects that are changing, and stores records
of the actions in a custom post type named "action_monitor".

Whenever tracked activity is detected and an "action_monitor" action is created, a webhook is sent
to the Gatsby site that is configured in the [GatsbyJS settings page](./settings.md), allowing Gatsby to rebuild
pages that are affected by the changed data.

## What activity does WPGatsby track?

WPGatsby tracks when public data is changed in WordPress. Private data, such as draft posts, or users
with no published content, is not tracked (except for during previews but that data is private and deleted as soon as the preview completes).

Below you can read more details about all the data that WPGatsby tracks.

Additionally, you can check out [the tests](https://github.com/gatsbyjs/wp-gatsby/blob/master/tests/wpunit/ActionMonitorTest.php)
to see all the data that is tracked and the expected outcomes of different actions in WordPress.

### Advanced Custom Fields

Whenever ACF Field Groups are updated or deleted (using the ACF User Interface), WPGatsby logs an
action monitor action to notify Gatsby that the WPGraphQL Schema _may_ have changed.

#### Activity Tracked for ACF

-   Update Field Group
-   Delete Field Group

### Media

Whenever Media Items are uploaded, edited or deleted in the WordPress Media Library, WPGatsby logs
an action monitor action to notify Gatsby of the change.

#### Activity Tracked for Media

-   Add Attachment
-   Edit Attachment
-   Delete Attachment
-   Save Image Editor File
-   Save Image File

### Menus

By default, Menus are considered private entities in WordPress. Once they are assinged to a Menu
Location, they become public. WPGatsby tracks activity related to public Menus and Menu Items.

Menus that are not assigned to Nav Menu Locations are not tracked, other than when they transition
from being not assigned a location to assigned a location, or the inverse.

#### Activity Tracked for Menus

-   Update Nav Menu Locations
-   Update Nav Menu
-   Delete Nav Menu
-   Update Nav Menu Item
-   Add Nav Menu Item

### Posts (of any public post type, set to show in GraphQL)

Posts (and Pages and Custom Post Types) are typically pretty central to any WordPress site, and it's
important for Gatsby to know when they change.

WPGatsby tracks when posts are published (made public), and when published posts are edited or
deleted. Non-published posts are not tracked by WPGatsby. So changes can be made to draft posts, for
example and WPGatsby won't track that activity.

#### Activity Tracked for Posts

-   Post Updated
-   Transition Post Status
-   Deleted Post
-   Post Meta Added
-   Post Meta Updated
-   Post Meta Deleted

### Post Types (registered post types, not content of a post type)

WPGatsby caches the list of registered post types, and whenever it detects changes to the Post Type
registry, it logs an "action_monitor" action and notifies Gatsby of the change.

This allows Gatsby to update it's GraphQL Schema to reflect the changes in WPGraphQL.

#### Activity Tracked for Post Types

-   Post Type registry changes

### Settings

The way WordPress stores settings is a bit of a blackbox. Many different things are stored in the
options table, so tracking changes to _all_ settings could be problematic. For example, tracking all
changes to all settings would cause WPGatsby to track transients. A transient changing would cause
Gatsby to fetch data from WordPress again, which could trigger further transient changes, and thus
could lead to an infinite loop.

So, instead of tracking updates to _all_ settings, WPGatsby only tracks specific settings that have
been configured to be "allowed" to be tracked.

WPGatsby provides an initial list of settings to track, and this list can be filtered (using the
`gatsby_action_monitor_should_track_option` filter) to disallow tracked settings, or allow tracking
of additional settings.

#### Activity Tracked for Settings

-   Updated settings (based on filterable allow-list of settings to track)

### Taxonomies (registered taxonomies, not terms of a taxonomy)

WPGatsby caches the list of registered taxonomies, and whenever it detects changes to the Taxonomy
registry, it logs an "action_monitor" action and notifies Gatsby of the change.

This allows Gatsby to update it's GraphQL Schema to reflect the changes in WPGraphQL.

#### Activity Tracked for Taxonomies

-   Custom Taxonomy registry changes

### Terms (of any public taxonomy, set to show in GraphQL)

Terms are tracked when they are created, updated or deleted.

#### Activity Tracked for Terms

-   Term Created
-   Term Updated
-   Term Deleted
-   Term Meta Added
-   Term Meta Updated
-   Term Meta Deleted

### Users (must be a published author of public content)

In WordPress, users are considered private by default. But once a user publishes content of a public
post type, that user becomes a public entity, as it then has an author archive page, REST API
endpoint, etc. WPGatsby tracks activity of these public users. Users with no published content are
not tracked.

#### Activity Tracked for Users

-   Profile Update
-   Delete User
-   Update User Meta
-   Add User Meta
-   Delete User Meta
-   Publish Post by author

## How to customize WPGatsby Activity Monitoring

You may find that you want to ignore certain actions from being tracked, or more likely you may want
to track additional actions that are not tracked by default.

Below you can learn more about both of these cases:

### Skip tracking of an action

If you'd like to prevent an action from being logged, you can use the `gatsby_pre_log_action_monitor_action` filter.

This filter will get passed the array of data to be logged.

If the filter returns `false`, the action will not be logged. If it returns anything else, the action
will proceed to be logged.

Example:

The example below would ignore logging actions for Post with ID `15`.

```php
add_filter( 'gatsby_pre_log_action_monitor_action', function( $null, $log_data ) {

    if ( 'Post' === $log_data['graphql_single_name'] && 15 === $log_data['node_id'] ) {
        return false;
    }
    return $null;

}, 10, 2 );
```

### Tracking a custom action

If you have a plugin that stores data in non-traditional ways, such as in a Custom Database Table,
you may need to track custom actions to tell Gatsby that something has changed.

You can do this by extending the `Monitor` class, and registering it with the `gatsby_action_monitors` filter. 

**Note**: All of the fields passed to the `log_action` method below are required.

```php
/**
 * Class - MyCustomActionMonitor
 */
class MyCustomActionMonitor extends \WPGatsby\ActionMonitor\Monitors\Monitor {

	/**
	 * Initialize the custom tracker.
	 */
	public function init() {
		// Hook into the custom action you want to log.
		add_action( 'my_custom_action', [ $this, 'custom_action_callback' ] );
	}

	/**
	 * Callback for custom action.
	 */
	public function custom_action_callback( $your_custom_object ) {

		/**
		 * Log an action to Action Monitor. 
		 * 
		 * This will create an entry in the `action_monitor` post type
		 * and will notify Gatsby Source WordPress about the activity.
		 */
		$this->monitor->log_action( [
			'action_type' => 'CREATE',
			'title' => $your_custom_object->title,
			'graphql_single_name' => 'MyCustomType',
			'graphql_plural_name' => 'MyCustomTypes',
			'status' => 'publish',
			'relay_id' => base64_encode( 'MyCustomType:' . $your_custom_object->ID ),
			'node_id' => $your_custom_object->ID,
		] );
	}
}

add_filter( 'gatsby_action_monitors', function( array $monitors, \WPGatsby\ActionMonitor\ActionMonitor $action_monitor) {
	$monitors['MyCustomActionMonitor'] = new MyCustomActionMonitor( $action_monitor );

	return $monitors;
}, 10, 2 );
```
