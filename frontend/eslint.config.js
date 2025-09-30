// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint'; // Import the TypeScript-specific tooling

export default defineConfig([
  // Ignore the 'dist' directory, where compiled output is stored.
  globalIgnores(['dist']),

  // Configuration for JavaScript and JSX files
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },

  // Configuration for TypeScript and TSX files
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended, // General ESLint recommended rules
      ...tseslint.configs.recommended, // TypeScript-specific recommended rules
      ...tseslint.configs.stylistic, // TypeScript-specific stylistic rules
      reactHooks.configs['recommended-latest'], // React Hooks rules for TypeScript
      reactRefresh.configs.vite, // React Refresh rules for TypeScript
    ],
    languageOptions: {
      parser: tseslint.parser, // Use the TypeScript ESLint parser
      globals: globals.browser,
      parserOptions: {
        // Specify your tsconfig.json for type-aware linting
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    // Customize or override rules for TypeScript files here
    rules: {
      // TypeScript-aware rule to handle unused variables
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Disable the base ESLint rule as the TypeScript one is better
      'no-unused-vars': 'off',
    },
  },

  // Adjustments to settings, if needed
  {
    settings: {
      react: {
        version: 'detect', // Auto-detect React version
      },
    },
  },
]);