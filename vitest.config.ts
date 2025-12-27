/// <reference types="vitest/config" />
import { playwright } from "@vitest/browser-playwright";
import { defineConfig, mergeConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import viteConfig from "./vite.config";

const vitestConfig = defineConfig({
	plugins: [storybookTest({ configDir: ".storybook" })],
	test: {
		browser: {
			enabled: true,
			instances: [{ browser: "chromium" }],
			provider: playwright(),
		},
		coverage: {
			reporter: ["text", "json-summary", "json"],
		},
		pool: "forks",
		setupFiles: ["./.storybook/vitest.setup.ts"],
	},
});

export default mergeConfig(viteConfig, vitestConfig);
