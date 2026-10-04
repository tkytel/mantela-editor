import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { configs as perfectionistConfigs } from "eslint-plugin-perfectionist";
import { visualizer } from "rollup-plugin-visualizer";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { defineConfig, lazyPlugins } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";

// https://vite.dev/config/
export default defineConfig({
	base: "/mantela-editor/",
	build: {
		rolldownOptions: {
			output: {
				codeSplitting: {
					groups: [
						{ name: "codemirrorJsonSchema", test: /node_modules[\\/]codemirror-json-schema[\\/]/ },
						{
							name: "codemirror",
							test: /node_modules[\\/]@codemirror[\\/](autocomplete|commands|lang-json|lint|view)[\\/]/,
						},
						{ name: "react", test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
					],
				},
			},
		},
	},
	fmt: {
		arrowParens: "always",
		bracketSameLine: false,
		bracketSpacing: true,
		endOfLine: "lf",
		ignorePatterns: ["pnpm-lock.yaml", "pnpm-workspace.yaml"],
		insertFinalNewline: true,
		jsxSingleQuote: false,
		objectWrap: "preserve",
		overrides: [
			{
				files: ["*.{json,jsonc,yaml,yml,html,md}", "**/*.{json,jsonc,yaml,yml,html,md}"],
				options: { useTabs: false },
			},
		],
		printWidth: 120,
		semi: true,
		singleQuote: false,
		sortImports: {
			newlinesBetween: false,
		},
		sortPackageJson: true,
		sortTailwindcss: {
			stylesheet: "./src/index.css",
		},
		tabWidth: 2,
		trailingComma: "all",
		useTabs: true,
	},
	lint: {
		categories: {
			correctness: "error",
		},
		ignorePatterns: ["dist/**", "coverage/**", "storybook-static/**"],
		jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }, "eslint-plugin-perfectionist"],
		options: { typeAware: true, typeCheck: true },
		plugins: ["oxc", "typescript", "unicorn", "import", "react", "jsx-a11y"],
		rules: {
			...perfectionistConfigs["recommended-alphabetical"].rules,
			"jsx-a11y/prefer-tag-over-role": "off",
			"perfectionist/sort-imports": "off",
			"react-hooks/exhaustive-deps": "warn",
			"react/only-export-components": ["warn", { allowConstantExport: true }],
			"react/react-in-jsx-scope": "off",
			"react/set-state-in-effect": "warn",
			"vite-plus/prefer-vite-plus-imports": "error",
		},
	},
	plugins: lazyPlugins(() => [
		react(),
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
	]),
	test: {
		coverage: {
			provider: "v8",
			reporter: ["text", "json-summary", "json"],
		},
		projects: [
			{
				extends: true,
				plugins: [storybookTest({ configDir: ".storybook" })],
				test: {
					browser: {
						enabled: true,
						headless: true,
						instances: [{ browser: "chromium" }],
						provider: playwright(),
					},
					name: "storybook",
				},
			},
		],
	},
});
