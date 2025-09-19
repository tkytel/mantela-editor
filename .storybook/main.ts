import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	addons: ["@storybook/addon-a11y"],
	framework: "@storybook/react-vite",
	stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
};

export default config;
