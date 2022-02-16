# Change Log

## 2.3.2

Previously Author and Contributor roles couldn't properly use Gatsby Cloud Preview. This release introduces new custom role capabilities which allow all authenticated users that can use WP preview to use Gatsby Preview.

## 2.3.1

Fixes bug in last version where not having the right ACF version installed would throw an error about `Call to undefined function "acf_get_options_pages"`

## 2.3.0

Added action monitor tracking for ACF options pages via PR #206. Thanks @henrikwirth!

## 2.2.1

Bumped the "tested to" version to latest WP version.

## 2.2.0

Added support for Gatsby Cloud Preview's new feature "eager redirects" which reduces the amount of time spent watching the preview loading screen by redirecting to the preview frontend as soon as possible and then letting the user wait for the preview to finish building there.

## 2.1.1

Changing away from the default UTC+0 timezone in WP could cause problems with local development and syncing changed data from WP. This release fixes that via PR #204.

## 2.1.0

Updated how the `gatsby_action_monitors` filter works. Previously this filter didn't properly expose the ActionMonitor class making it impossible or very difficult to add your own action monitors. Thanks @justlevine! via PR #203.

## 2.0.2

WPGraphQL made a breaking change in a minor release v1.6.7 which caused delta updates to stop working. Fixed via https://github.com/gatsbyjs/wp-gatsby/pull/201. Breaking change notice here https://github.com/wp-graphql/wp-graphql/blob/develop/readme.txt#L80-L109

## 2.0.1

- gatsby-source-wordpress v5.14.2 and v6.1.0 both support WPGatsby v2.0.0+. This release re-published v2 as the latest WPGatsby version.

## 1.1.4

- Rolling out a release to overwrite v2.0.0. gatsby-source-wordpress didn't yet have a new release allowing WPGatsby v2.0.0+ support.

## 2.0.0

We finalized support for Gatsby Cloud Content Sync Previews in this release. Content Sync is a Gatsby Cloud preview loader. Previously preview loading was handled within this plugin but we removed support for that legacy preview loader as the support burden for keeping the old and new preview logic around would be too much. Gatsby Cloud Content Sync is far more reliable than WPGatsby's preview loader as it has more context on the Gatsby build process.

For Content Sync to work you will need to upgrade to the latest version of `gatsby-source-wordpress` and either the latest `3.0.0` or `4.0.0` version of Gatsby core.

In addition this release comes with some bug fixes:

- Fixed double instantiation of ActionMonitor classes which caused double webhooks and potentially double saving of data in some cases.
- Makes preview routing more reliable by simplifying our logic and adding a `gatsby_preview=true` param to all preview links. For some users every second preview would fail to correctly route to the preview template. This is now fixed.

## 1.1.3

- The uri field was being overwritten during GraphQL requests, resulting in post uri's that included the content sync URL.
- Some logic attempting to choose the correct manifest ID instead of regenerating it was causing manifest id's to be outdated during previews.

## 1.1.2

- Fixed redirection to Gatsby Cloud Content Sync preview loader in Gutenberg

## 1.1.0

- Added support for the new Gatsby Cloud Content Sync API. This new API moves the WPGatsby Preview loader logic to the Gatsby Cloud side as Cloud has more context on the Gatsby process making it more reliable than the existing WPGatsby preview loader with fewer restrictions and caveats.

## 1.0.12

Preview webhooks added the remote url as a property on the webhook body. When publishing updates we also send a preview webhook to update the preview Gatsby site. These two webhook bodies previously differed in that the latter didn't include a remoteUrl property. As of gatsby-source-wordpress@5.10.0 this causes problems because the source plugin assumes this property always exists. Related to https://github.com/gatsbyjs/gatsby/issues/32732. Fixed in https://github.com/gatsbyjs/wp-gatsby/pull/184

## 1.0.11

- Fixed a warning state for Preview to let users know when the preview Gatsby site set in the preview webhook setting is pointing at a Gatsby site which isn't sourcing data from the current WP site. Preview requires a 1:1 connection between WP and Gatsby where settings point at a Gatsby site that sources data from the WP instance previews are originating from.

## 1.0.10

- Fixed preview loader logic for subdirectory WP installs so that we request the GraphQL endpoint from the right URL.

## 1.0.9

- Fixed a bug where draft posts weren't previewable.

## 1.0.8

- Our internal preview logic had a bug where a request was being made with double forward slashes in the url in some cases. This broke incremental builds previews but worked on regular `gatsby develop` previews. This is fixed in this release.

## 1.0.7

- Before using WPGraphQL::debug() we weren't making sure that the debug method exists on that class. This could throw errors for older versions of WPGraphQL - we now check that the method exists before using it.

- Documents using multiple webhooks support in Build and Preview webhook input field labels.

- Fixes trailing comma in MediaActionMonitor log array.

## 1.0.6

- Bump stable version tag

## 1.0.5

- Fixed our build/publish process which was failing due to using the develop branch of WPGraphQL in tests.

## 1.0.4

- In some cases the homepage was not previewable in Gatsby Preview - this is now fixed.

## 1.0.3

- Fixed `wp_save_image_file` and `wp_save_image_editor_file` callback argument count.

## 1.0.2

- An erroneous change in our composer autoload broke our first stable release 😅 bit of a rocky start but lets try this again 🤝 😁 You can bet we'll be adding a test for this 😂

## 1.0.1

- Fixed a broken link in the readme.

## 1.0.0

This plugin has come a long way over the past few months! This release introduces no changes outside of a few pages of docs. We're choosing this point to call this plugin stable as the plugin is well tested via our test suites and members of the community using it in the wild. Thanks everyone for your help and support in getting this plugin to this point!

## 0.9.2

### Bug Fixes

- The preview template loader was fixed for cases where the global $post is not set, which previously lead to PHP errors.

## 0.9.1

- Removed a new internal taxonomy from the GraphQL schema which was unintentionally added in the last release.

## 0.9.0

### Breaking Changes

- This release massively increases the performance of Gatsby Previews when more than one person is previewing or editing content at the same time. Previously when multiple users previewed simultaneously, only one of those users would see their preview or it would take a very long time for the others to see their previews. Now many users can preview concurrently. This was tested with a headless chrome puppeteer script. We found that 10 users making 100 previews over the course of a few minutes now have a 100% success rate. Previously 3 users making 30 previews would have a less than 30% success rate. This is a breaking change because `gatsby-source-wordpress-experimental` has some changes which are required to make this work.
- Previously, saving a Media item would call the build and preview webhooks. This wasn't desireable because if you upload an image to your post, that will start a build to just source that media item, then when you press publish or preview you'd have to wait for the image build to complete before being able to see your build. Now a webhook is not sent out when images are uploaded/edited and other content updates which do send a webhook will catch these image changes and apply them alongside the other changes.

## 0.8.0

### Breaking Changes

This is a breaking change release as a lot of internals for the Action Monitor class have been modified and moved around. For most users nothing will change but for those who are using our internal plugin functions/classes in their own custom code, things might break.

- Refactors Action Monitor to have separate classes for tracking activity for Acf, Media, Menus, Posts, Post Types, Settings, Taxonomies, Terms, and Users.

### Fixes and improvements

- TESTS! Lots of tests for the Action Monitors.
- JWT Secret is now set once when WPGatsby is first loaded, instead of every time the settings page is visited.

### Issues closed by this release

- [#70](https://github.com/gatsbyjs/wp-gatsby/issues/70): When field groups are saved using ACF Field Group GUI, a "Diff Schema" action is triggered
- [#58](https://github.com/gatsbyjs/wp-gatsby/issues/58): A "Refetch All" action is available and is used when Permalinks are changed
- [#57](https://github.com/gatsbyjs/wp-gatsby/issues/57): Term meta is now properly tracked when changed
- [#56](https://github.com/gatsbyjs/wp-gatsby/issues/56): Custom post types (all post types that are public and show_in_graphql) are now tracked when they are moved from publish to trash and vis-versa
- [#41](https://github.com/gatsbyjs/wp-gatsby/issues/41): Codeception tests are now in place
- [#38](https://github.com/gatsbyjs/wp-gatsby/issues/38): Many core WordPress options have been added to an allow-list and trigger a general NON_NODE_ROOT_FIELDS action. A few specific actions trigger specific actions for specific nodes. For example, changing the home_page triggers an update for the new page and the old page being changed as the URI is now different.
- [#26](https://github.com/gatsbyjs/wp-gatsby/issues/26): Posts that transition from future->publish now trigger an action (ensuring WordPress cron is triggered for WordPress sites using Gatsby front-ends might need more thought still though. . .)
- [#17](https://github.com/gatsbyjs/wp-gatsby/issues/17): Meta is now tracked for Posts, Terms and Users (comments are not currently tracked at the moment)
- [#15](https://github.com/gatsbyjs/wp-gatsby/issues/15): Saving permalinks triggers a REFETCH_ALL Action
- [#7](https://github.com/gatsbyjs/wp-gatsby/issues/7): Gatsby JWT Secret is now generated once and saved immediately and not generated again
- [#6](https://github.com/gatsbyjs/wp-gatsby/issues/6): Gatsby now tracks only post_types (and taxonomies) that are set to be both public and show_in_graphql and there are filters to override as needed.

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
