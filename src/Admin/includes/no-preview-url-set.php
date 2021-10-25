<?php use WPGatsby\Admin\Preview; ?>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Preview</title>
	<style>
		<?php Preview::print_file_contents( 'includes/style.css' ); ?>
	</style>
</head>

<body>
<div class="content">
	<h1>Preview not found</h1>
	<p>Visit the <a
				href="<?php echo get_bloginfo( 'url' ); ?>/wp-admin/options-general.php?page=gatsbyjs"
				target="_blank" rel="noopener, nofollow. noreferrer, noopener, external"
				>settings
			page</a> to add a valid Preview webhook URL.
		<br>
		<br>
		If you don't have a Gatsby Preview instance, you can <a
				href="https://www.gatsbyjs.com/preview/" target="_blank"
				rel="noopener, nofollow. noreferrer, noopener, external">set one up now on Gatsby
			Cloud.</a>
	</p>
</div>
</body>

</html>
<?php wp_footer(); ?>
