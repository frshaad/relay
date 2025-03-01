import pluginJs from '@eslint/js';
import configPrettier from 'eslint-config-prettier';
import n from 'eslint-plugin-n';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { n },
    rules: { 'n/no-process-env': 'error' },
  },
  configPrettier,
);
