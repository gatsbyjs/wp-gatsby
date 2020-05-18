# Change Log

## 0.2.6

### Bug fixes

Fixed an issue where we were trying to access post object properties when we didn't yet have the post.

## 0.2.5

### Bug Fixes

Earlier versions of WPGatsby were recording up to 4 duplicate content saves per content change in WordPress. This release stops that from happening. WPGatsby does garbage collection, so any duplicate actions will be automatically removed from your DB.