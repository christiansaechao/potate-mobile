const { getConfig } = require("expo/config");

module.exports = getConfig(__dirname, {
  routes: {
    ignore: [
      "**/*.d.ts",
      "**/components/**",
      "**/constants/**",
      "**/hooks/**",
      "**/services/**",
      "**/types/**",
    ],
  },
});
