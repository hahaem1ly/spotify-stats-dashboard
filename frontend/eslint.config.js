import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import babelParser from '@babel/eslint-parser';

export default [
  { ignores: ['dist'] },
  {
    files: ['src/**/*.{js,jsx,tsx}'], // Ensures ESLint scans all source files
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parser: babelParser,
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Enables JSX
        sourceType: 'module', // Use ES Modules
        requireConfigFile: false, // No .babelrc required
      },
    },
    settings: { react: { version: '18.2' } }, // Adjust React version as needed
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
