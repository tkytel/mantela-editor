import globals from "globals";
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
					defaultProject: "./tsconfig.json",
					allowDefaultProject: ["*.cjs", "*.mjs"],
				},
				tsconfigRootDir: import.meta.dirname,
				sourceType: "module",
			},
		},
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		plugins: {
			"react-refresh": reactRefresh,
		},
		prettier: true,
		rules: {
			// "func-style": ["error", "declaration", { allowArrowFunctions: false }],

			"@stylistic/block-spacing": "off",
			"@stylistic/indent-binary-ops": "off",
			"@stylistic/member-delimiter-style": "off",
			"@stylistic/no-mixed-operators": "off",
			"@stylistic/object-curly-spacing": ["error", "always"],

			"@typescript-eslint/triple-slash-reference": "off",
			"@typescript-eslint/naming-convention": "off",
			"@typescript-eslint/no-dynamic-delete": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

			"import-x/extensions": "off",
			"import-x/no-anonymous-default-export": "off",

			"n/file-extension-in-import": "off",
			"n/prefer-global/process": "off",

			"unicorn/filename-case": "off",
			"unicorn/prefer-module": "off",
			"unicorn/prevent-abbreviations": "off",

			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		},
	},
	{
		rules: {
			"comma-dangle": ["error", "only-multiline"],
		},
	},
];

export default xoConfig;
