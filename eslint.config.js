// eslint.config.js
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    // 👇 tell eslint-plugin-import to use TS paths from tsconfig
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "import/no-default-export": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off", // Disable TypeScript-specific rule
      "no-unused-imports": "off",
    },
  },
]);
