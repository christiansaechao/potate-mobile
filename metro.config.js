// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("node:path");

// Start with Expo's default config
let config = getDefaultConfig(__dirname);

// Let Metro treat .sql as source files so Babel can transform them
config.resolver.sourceExts = [...config.resolver.sourceExts, "sql"];

// Add support for WASM files
config.resolver.assetExts = [
  ...config.resolver.assetExts.filter((ext) => ext !== "wasm"),
  "wasm",
];

// Add "@" alias pointing to project root
config.resolver.alias = {
  ...(config.resolver.alias || {}),
  "@": path.resolve(__dirname),
};

// Wrap with NativeWind
config = withNativeWind(config, {
  input: "./global.css",
});

// Export final config
module.exports = config;
