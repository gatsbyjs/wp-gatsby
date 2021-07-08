<?php

use WPGatsby\Admin\Preview;

$preview_url = Preview::get_gatsby_preview_instance_url();
?>

<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Preview</title>

	<style>
		<?php Preview::printFileContents( 'assets/dist/styles.css' ); ?>
	</style>

	<script>
		<?php Preview::print_initial_preview_template_state_js(); ?>        
		<?php Preview::printFileContents( 'assets/dist/preview-client.js' ); ?>
	</script>
</head>

<body>

<div id="loader">
	<div id="gatsby-loading-logo">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" focusable="false" class="logo">
		<title>Gatsby Logo</title>
		<circle cx="14" cy="14" r="14" fill="#639" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#52297a;"></circle>
		<path fill="#fff" d="M6.2 21.8C4.1 19.7 3 16.9 3 14.2L13.9 25c-2.8-.1-5.6-1.1-7.7-3.2zm10.2 2.9L3.3 11.6C4.4 6.7 8.8 3 14 3c3.7 0 6.9 1.8 8.9 4.5l-1.5 1.3C19.7 6.5 17 5 14 5c-3.9 0-7.2 2.5-8.5 6L17 22.5c2.9-1 5.1-3.5 5.8-6.5H18v-2h7c0 5.2-3.7 9.6-8.6 10.7z" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#181a1b;"></path>
		</svg>
	</div>
	<h1>Loading Preview</h1>
	<p id="preview-loader-warning" style="display: none;"></p>
</div>

<iframe id='preview' name="preview" frameborder="0"></iframe>

<div class="content error" style="display: none;">
	<h1>The Preview couldn't be loaded</h1>
	<p>
		The Preview frontend url set on the
		 <a
				href="<?php echo get_bloginfo( 'url' ); ?>/wp-admin/options-general.php?page=gatsbyjs"
				target="_blank" rel="noopener, nofollow. noreferrer, noopener, external"
		>settings
			page</a> isn't working properly.
		<br>
		<br>
		<b>Preview URL: </b>
		<a 
			href="<?php echo $preview_url; ?>"
			target="_blank" rel="noopener, nofollow. noreferrer, noopener, external"
		>
			<?php echo $preview_url; ?>
		</a>
	</p>
	<br>
	<pre id="error-message-element"></pre>
	<h2>Troubleshooting</h2>
	<span id="troubleshooting-html-area">
		<p>
			Please ensure your URL is correct and your Preview instance is up and running.
			<br>
			<br>
			If you've set the correct URL, your Preview instance is currently running, and you're still having trouble, please <a
					href="https://www.gatsbyjs.com/cloud/docs/wordpress/getting-started/" target="_blank"
					rel="noopener, nofollow. noreferrer, noopener, external">refer to the docs</a> for
			troubleshooting steps, ask your developer, or <a href="https://www.gatsbyjs.com/contact-us/" target="_blank"
										rel="noopener, nofollow. noreferrer, noopener, external">contact
				support</a> if that doesn't solve your issue.
			<br>
			<br>
			If you don't have a valid Gatsby Preview instance, you can <a
					href="https://www.gatsbyjs.com/preview/" target="_blank"
					rel="noopener, nofollow. noreferrer, noopener, external">set one up now on Gatsby
				Cloud.</a>
			</p>
	</span>
	<h2>Developer instructions</h2>
	<p>Please visit 
		<a
			href="https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/docs/tutorials/configuring-wp-gatsby.md#setting-up-preview" target="_blank"
			rel="noopener, nofollow. noreferrer, noopener, external"
		>
		the docs
		</a> for instructions on setting up Gatsby Preview.
	</p>
</div>
</body>

<?php wp_footer(); ?>

</html>
