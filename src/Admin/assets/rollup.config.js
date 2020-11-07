import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"

import cleanup from "rollup-plugin-cleanup"

const extensions = [".js", ".ts"]

const config = {
	input: "src/start-preview-client.ts",
	output: {
		file: "dist/preview-client.js",
		format: "iife",
		sourcemap: true,
		name: "WPGatsbyPreviewClient",
	},
	plugins: [
		commonjs(),
		nodeResolve({
			extensions,
		}),
		babel({ babelHelpers: "runtime", extensions }),
		cleanup(),
	],
}

export default config
