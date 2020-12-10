# Change Log

## 0.7.3

- Small internal changes to Previews to facilitate e2e tests.

## 0.7.2

- Version 0.7.0 introduced a change which resulted in Previews for some WP instances being overwritten by published posts on each preview.

## 0.7.1

- The last version added some internal taxonomies to the GraphQL schema unintentionally. This release removes them.
## 0.7.0

### Breaking Changes

- Previously we were storing a brand new post internally for every content-related action that happened in your site. As of this release we only make a single action post for each post you take actions against and update it each time instead of creating a new one.

## 0.6.8

- The `NO_PAGE_CREATED_FOR_PREVIEWED_NODE` preview status was no longer making it through to the preview template because we were checking if the preview had deployed before checking if a page had been created in Gatsby for the preview. this release fixes that.
- The preview-template.php check for wether or not the preview frontend is online could occasionally come back with a false negative. It is now more resilient and will recheck for 10 seconds before showing an error.
- The above check used to throw harmless CORS errors in the console, this check is now done server-side so that CORS isn't an issue.

## 0.6.7

- Gatsby Preview process errors were not coming through for new post drafts. They do now :)
- I was checking if the Gatsby webhook hit by WPGatsby returned any errors and displaying an error in the preview client if it did. It turns out this is problematic because the webhook can return errors in WPGatsby and yet Gatsby can still have successfully received it. So the logic is now more optimistic and tries to load the preview regardless of wether or not we received an error when posting to the webhook.

## 0.6.6

- Fixed a timing issue between Previews and WPGatsby. WPGatsby now reads the page-data.json of the page being previewed in order to determine wether or not it's been deployed.
- Added publish webhooks for Preview so that polling is not needed in Gatsby Preview on the source plugin side.

## 0.6.5

- Improved garbage collection of old action monitor posts. Garbage collection previously took over 20 seconds to clean up 6,204 action_monitor actions, after this change it takes approximately 1/10 of a second.

## 0.6.4

- Extended WPGatsby JWT expiry to 1 hour. It was previously 30 seconds which can be problematic for slower servers and Gatsby setups.

## 0.6.3

- graphql_single_name's that start with a capital letter were causing issues because WPGatsby was not making the first character lowercase but WPGraphQL does do this when adding the field to schema.

## 0.6.2

- More PHP 7.1 syntax fixes. We will soon have CI tests which will prevent these issues.

## 0.6.1

- Fixed an unexpected token syntax error.

## 0.6.0

- This release adds a major re-work to the Gatsby Preview experience! It adds remote Gatsby state management and error handling in WordPress so that WP and Gatsby don't get out of sync during the Preview process.

## 0.5.4

- Force enable WPGraphQL Introspection when WPGatsby is enabled. [WPGraphQL v0.14.0](https://github.com/wp-graphql/wp-graphql/releases/tag/v0.14.0) has Introspection disabled by default with an option to enable it, and Gatsby requires it to be enabled, so WPGatsby force-enables it.

## 0.5.3

- Meta delta syncing was using the same code for posts and users. In many cases this was causing errors when updating usermeta. This code is now scoped to posts only and we will add usermeta delta syncing separately.
- Our composer setup was previously double autoloading

## 0.5.2

- Added a backwards compatibility fix for a regression introduced in v0.4.18 where WPGraphQL::debug() was called. This method is only available in later versions of WPGraphQL, but this plugin currently supports earlier versions

## 0.5.1

- Fixed a typo in the new footer locations 🤦‍♂️ gatbsy should be gatsby

## 0.5.0

### Bug Fixes

- Added support for delta syncing menu locations. This appeared as a bug where updating your menu locations didn't update in Gatsby, but this was actually a missing feature.

## 0.4.18

### Bug Fixes

- The action_monitor post type was registered incorrectly so that it was showing in the rest api, in search, and other places it didn't need to be. This release fixes that. Thanks @jasonbahl!

## 0.4.17

### New Features

- Added `WPGatsby.arePrettyPermalinksEnabled` to the schema in order to add more helpful error messages to the Gatsby build process.
- Added a filter `gatsby_trigger_dispatch_args` to filter the arguments passed to `wp_safe_remote_post` when triggering webhooks.

## 0.4.16

### Bug Fixes

It turns out the new feature in the last release could potentially cause many more issues than it presently solves, so it has been disabled as a bug fix. This will be re-enabled within the next couple weeks as we do more testing and thinking on how best to approach sending WP options events to Gatsby.

## 0.4.15

### New Features

- Non-node root fields (options and settings) are now recorded as an action so Gatsby can inc build when the site title changes for example.

## 0.4.14

### Bug Fixes

- Making a post into a draft was not previously saving an action monitor post which means posts that became drafts would never be deleted.

## 0.4.13

### Bug Fixes

- the ContentType.archivePath field was returning an empty string instead of `/` for a homepage archive.

## 0.4.12

### New Features

- Added temporary `ContentType.archivePath` and `Taxonomy.archivePath` fields to the schema until WPGraphQL supports these fields.

## 0.4.11

### Bug Fixes

- get_home_url() was being used where get_site_url() should've been used, causing the gql endpoint to not be referenced correctly in some situations. For example when using Bedrock.

## 0.4.10

### Bug Fixes

- The Preview fix in the last release introduced a new bug where saving a draft at any time would send a webhook to the Preview instance.

## 0.4.9

### Bug Fixes

- Preview wasn't working properly for new posts that hadn't yet been published or for drafts.

## 0.4.8

Pushing release to WordPress.org

## 0.4.7

### New Features

- Added a link to the GatsbyJS settings page on how to configure this plugin.

### Bug Fixes

- Activating this plugin before WPGraphQL was causing PHP errors.

## 0.4.6

Add Wapuu Icons for display in the WordPress.org repo

## 0.4.5

Re-publish with proper package name

## 0.4.4

Testing Github Actions

## 0.4.3

New release to trigger publishing to WordPress.org!

## 0.4.2

### Bug Fixes

- Previously when a post transitioned from published to draft, it wouldn't be deleted in Gatsby

## 0.4.1

Version bump to add /vendor directory to Git so that Github releases work as WP plugins without running `composer install`. In the future there will be a better release process, but for now this works.

## 0.4.0

### Breaking Changes

- WPGraphQL was using nav_menu for it's menu relay id's instead of term. WPGQL 0.9.1 changes this from nav_menu to term. This is a breaking change because cache invalidation wont work properly if the id is incorrect. So we move to v0.4.0 so gatsby-source-wordpress-experimental can set 0.4.0 as it's min version and cache invalidation will keep working.

## 0.3.0

### Breaking Changes

- Updated Relay ids to be compatible with WPGraphQL 0.9.0. See https://github.com/wp-graphql/wp-graphql/releases/tag/v0.9.0 for more info.
- Bumped min PHP and WP versions

## 0.2.6

### Bug fixes

Fixed an issue where we were trying to access post object properties when we didn't yet have the post.

## 0.2.5

### Bug Fixes

Earlier versions of WPGatsby were recording up to 4 duplicate content saves per content change in WordPress. This release stops that from happening. WPGatsby does garbage collection, so any duplicate actions will be automatically removed from your DB.
