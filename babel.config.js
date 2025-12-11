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
            "@": "./",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      ],
      ["babel-plugin-inline-import", { extensions: [".sql"] }],

      // keep this LAST
      "react-native-reanimated/plugin",
    ],
  };
};
