import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import postcss from "rollup-plugin-postcss"
import postcssPresetEnv from "postcss-preset-env"

import cleanup from "rollup-plugin-cleanup"

const config = {
	input: "src/index.js",
	output: {
		file: "dist/script.js",
		format: "iife",
		sourcemap: true,
		inputSourceMap: true,
	},
	plugins: [
		commonjs(),
		nodeResolve(),
		babel({ babelHelpers: "runtime" }),
		postcss({
			plugins: [
				postcssPresetEnv(),
				require("cssnano")({
					preset: "default",
				}),
			],
		}),
		cleanup(),
	],
}

export default config
