import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import flowbiteReact from "flowbite-react/plugin/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
	base: "/mantela-editor/",
	plugins: [
		react({}),
		flowbiteReact(),
		// NOTE: @apidevtools/json-schema-ref-parser をブラウザで動かすため。
		nodePolyfills({
			globals: {
				Buffer: true,
				global: true,
				process: true,
			},
			include: ["path"],
		}),
	],
});
