// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./app",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      ],

      // keep this LAST
      "react-native-reanimated/plugin",
    ],
  };
};
