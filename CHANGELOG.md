# Change Log

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