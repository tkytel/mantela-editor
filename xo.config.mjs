import globals from "globals";
import jsxA11y from "eslint-plugin-jsx-a11y";
import perfectionist from "eslint-plugin-perfectionist";
import reactRefresh from "eslint-plugin-react-refresh";

/** @type import('xo').FlatXoConfig */
const xoConfig = [
	{
		files: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.mts", "**/*.ts", "**/*.tsx"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				projectService: {
					allowDefaultProject: ["*.cjs", "*.mjs"],
					defaultProject: "./tsconfig.json",
				},
				sourceType: "module",
				tsconfigRootDir: import.meta.dirname,
			},
		},
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		plugins: {
			perfectionist,
			"react-refresh": reactRefresh,
		},
		prettier: true,
		rules: {
			"@stylistic/block-spacing": "off",
			"@stylistic/indent-binary-ops": "off",
			"@stylistic/jsx-sort-props": "error",
			"@stylistic/member-delimiter-style": "off",
			"@stylistic/no-mixed-operators": "off",
			"@stylistic/object-curly-spacing": ["error", "always"],

			"@typescript-eslint/naming-convention": "off",
			"@typescript-eslint/no-dynamic-delete": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
			"@typescript-eslint/triple-slash-reference": "off",

			"import-x/extensions": "off",
			"import-x/no-anonymous-default-export": "off",

			"n/file-extension-in-import": "off",
			"n/prefer-global/process": "off",

			...perfectionist.configs["recommended-alphabetical"].rules,
			"perfectionist/sort-imports": "off",

			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"unicorn/filename-case": "off",
			"unicorn/prefer-module": "off",

			"unicorn/prevent-abbreviations": "off",
		},
	},
	{
		files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			"jsx-a11y": jsxA11y,
		},
		rules: {
			...jsxA11y.configs.strict.rules,
		},
	},
	{
		rules: {
			"comma-dangle": ["error", "only-multiline"],
		},
	},
];

export default xoConfig;
