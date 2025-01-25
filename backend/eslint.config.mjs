import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs}"], // Target only backend JavaScript files
    languageOptions: {
      ecmaVersion: 2021, // Support modern JavaScript features
      sourceType: "module", // Enable ES Modules if used
      globals: globals.node, // Use Node.js globals (like `process`)
    },
    rules: {
      "no-unused-vars": "warn", // Warn for unused variables
      "no-undef": "error", // Error for undefined variables
    },
  },
];
