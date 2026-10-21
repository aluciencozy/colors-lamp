import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["js/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: globals.browser
    },
    rules: js.configs.recommended.rules
  },
  {
    files: ["js/md5.js"],
    languageOptions: {
      globals: {
        module: "readonly"
      }
    }
  }
];
