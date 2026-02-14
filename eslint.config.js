import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**", "*.config.js", "*.config.cjs"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, prettier: prettierPlugin },
    extends: ["js/recommended", eslintConfigPrettier],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-console": "error",
      eqeqeq: "error",
      "no-var": "error",
    },
  },
]);
