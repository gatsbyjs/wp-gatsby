module.exports = {
	ignore: [/core-js/, /@babel\/runtime/],
	presets: [
		[
			"@babel/preset-env",
			{
				useBuiltIns: "usage",
				corejs: 3,
				modules: false,
			},
		],
		"minify",
	],
	plugins: [
		"@babel/plugin-transform-typescript",
		"@babel/plugin-transform-runtime",
		"@babel/plugin-transform-regenerator",
		"@babel/plugin-proposal-optional-chaining",
	],
}
