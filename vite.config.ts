import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import flowbiteReact from "flowbite-react/plugin/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
	base: "/mantela-editor/",
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					codemirror: [
						"@codemirror/autocomplete",
						"@codemirror/lint",
						"@codemirror/view",
						"@codemirror/commands",
						"@codemirror/lang-json",
					],
					codemirrorJsonSchema: ["codemirror-json-schema"],
					react: ["react", "react-dom/client"],
				},
			},
		},
	},
	plugins: [
		...react(),
		flowbiteReact(),
		tailwindcss(),
		// NOTE: @apidevtools/json-schema-ref-parser をブラウザで動かすため。
		nodePolyfills({
			globals: {
				Buffer: true,
				global: true,
				process: true,
			},
			include: ["path"],
		}),
		visualizer(),
	],
});
