import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	addons: ["@storybook/addon-a11y"],
	core: {
		disableTelemetry: true,
	},
	framework: "@storybook/react-vite",
	stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	async viteFinal(viteConfig) {
		viteConfig.optimizeDeps = {
			include: [
				"@apidevtools/json-schema-ref-parser",
				"@codemirror/lang-json",
				"@codemirror/lint",
				"@codemirror/view",
				"@uiw/react-codemirror",
				"codemirror-json-schema",
				"flowbite-react/store/init",
				"jotai-immer",
				"react-dom/client",
				"uuid",
				"vite-plugin-node-polyfills/shims/buffer",
				"vite-plugin-node-polyfills/shims/global",
				"vite-plugin-node-polyfills/shims/process",
				"zod",
			],
		};
		return viteConfig;
	},
};

export default config;
