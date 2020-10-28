const postcssPresetEnv = require("postcss-preset-env")

module.exports = {
	plugins: [
		postcssPresetEnv(),
		require("cssnano")({
			preset: "default",
		}),
	],
}
