<<<<<<< Updated upstream
// https://docs.expo.dev/guides/using-eslint/
=======
// eslint.config.js
>>>>>>> Stashed changes
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
  },
]);
