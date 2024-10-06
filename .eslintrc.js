var OFF = 0,
	WARN = 1,
	ERROR = 2;
module.exports = {
	env: { browser: true, es2021: true },
	extends: ["next/core-web-vitals", "next/typescript", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
	overrides: [
		{
			env: { node: true },
			files: [".eslintrc.{js,cjs}"],
			parserOptions: { sourceType: "script" },
			// override rules here
			rules: {},
		},
	],
	parser: "@typescript-eslint/parser",
	parserOptions: { ecmaVersion: "latest" },
	plugins: ["@typescript-eslint"],
	rules: {
		// "react-native/no-inline-styles": OFF,
		semi: [ERROR, "always"],
		quotes: [WARN, "double"],
		"@typescript-eslint/no-explicit-any": WARN,
		"no-undef": WARN,
	},
};
