/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from "vite";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import viteConfig from "./vite.config";

export default mergeConfig(
	viteConfig,
	defineConfig({
		plugins: [
			react(),
			storybookTest({
				configDir: ".storybook",
			}),
		],
		test: {
			browser: {
				enabled: true,
				instances: [{ browser: "chromium" }],
				provider: "playwright",
			},
			coverage: {
				reporter: ["text", "json-summary", "json"],
			},
			setupFiles: ["./.storybook/vitest.setup.ts"],
		},
	}),
);
