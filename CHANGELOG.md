# Change Log

## 0.2.5

### Bug Fixes

Earlier versions of WPGatsby were recording up to 4 duplicate content saves per content change in WordPress. This release stops that from happening. WPGatsby does garbage collection, so any duplicate actions will be automatically removed from your DB.