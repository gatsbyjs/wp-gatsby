module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				useBuiltIns: "entry",
				corejs: 2,
				modules: false,
			},
		],
		"minify",
	],
	plugins: [
		"@babel/plugin-transform-runtime",
		"@babel/plugin-transform-regenerator",
		"@babel/plugin-proposal-optional-chaining",
	],
}
