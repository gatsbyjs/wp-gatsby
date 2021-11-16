=== WPGatsby ===
Contributors: gatsbyinc, jasonbahl, tylerbarnes1
Tags: Gatsby, GatsbyJS, JavaScript, JAMStack, Static Site generator, GraphQL, Headless WordPress, Decoupled WordPress
Requires at least: 5.4.2
Tested up to: 5.6
Requires PHP: 7.3
Stable tag: 2.1.0
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

<div align="center" style="margin-bottom: 20px;">
<img src="https://raw.githubusercontent.com/gatsbyjs/gatsby/master/packages/gatsby-source-wordpress/docs/assets/gatsby-wapuus.png" alt="Wapuu hugging a ball with the Gatsby logo on it" />
</div>

<p align="center">
  <a href="https://github.com/gatsbyjs/wp-gatsby/blob/master/license.txt">
    <img src="https://img.shields.io/badge/license-GPLv3-blue.svg" alt="Gatsby and gatsby-source-wordpress are released under the MIT license." />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=gatsbyjs">
    <img src="https://img.shields.io/twitter/follow/gatsbyjs.svg?label=Follow%20@gatsbyjs" alt="Follow @gatsbyjs" />
  </a>
</p>

WPGatsby is a free open-source WordPress plugin that optimizes your WordPress site to work as a data source for [Gatsby](https://www.gatsbyjs.com/docs/how-to/sourcing-data/sourcing-from-wordpress).

This plugin must be used in combination with the npm package [`gatsby-source-wordpress@^4.0.0`](https://www.npmjs.com/package/gatsby-source-wordpress).

## Install and Activation

WPGatsby is available on the WordPress.org repository and can be installed from your WordPress dashboard, or by using any other plugin installation method you prefer, such as installing with Composer from wpackagist.org.

## Plugin Overview

This plugin has 2 primary responsibilities:

-   [Monitor Activity in WordPress to keep Gatsby in sync with WP](https://github.com/gatsbyjs/wp-gatsby/blob/master/docs/action-monitor.md)
-   [Configure WordPress Previews to work with Gatsby](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/docs/tutorials/configuring-wp-gatsby.md#setting-up-preview)

Additionally, WPGatsby has a settings page to connect your WordPress site with your Gatsby site:

-   [WPGatsby Settings](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/docs/tutorials/configuring-wp-gatsby.md)
