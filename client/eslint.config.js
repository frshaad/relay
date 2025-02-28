import pluginJs from '@eslint/js';
import configPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import n from 'eslint-plugin-n';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const MAX_DEPTH = 4;
const MAX_FN_PARAMS = 3;

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist'],
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { settings: { react: { version: 'detect' } } },
  {
    languageOptions: { globals: { ...globals.browser, React: true } },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  jsxA11y.flatConfigs.recommended,
  {
    plugins: { n },
    rules: { 'n/no-process-env': 'error' },
  },
  {
    rules: {
      'prefer-const': 'error',
      'max-depth': ['warn', { max: MAX_DEPTH }],
      'max-params': ['error', { max: MAX_FN_PARAMS }],
      'no-eval': 'error',
      'no-param-reassign': 'error',
      'no-promise-executor-return': 'error',
      'no-unreachable-loop': 'error',

      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',

      'react/button-has-type': 'error',
      'react/jsx-no-constructed-context-values': 'error',
      'react/no-array-index-key': 'error',
      'react/self-closing-comp': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/hook-use-state': 'error',
      'react/no-unstable-nested-components': 'error',

      'jsx-a11y/lang': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
    },
  },
  configPrettier,
);
