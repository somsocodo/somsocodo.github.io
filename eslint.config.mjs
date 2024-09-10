// @ts-check
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslint from '@eslint/js';

export default tseslint.config({
      files: ['**/*.{ts,tsx}'],
      ignores: ["build"],
      rules: {
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off"
      },
      extends: [
        ...tseslint.configs.recommended,
        pluginReact.configs.flat.recommended]
      }
)