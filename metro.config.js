// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("node:path");

// Load Expo's default config first
let config = getDefaultConfig(__dirname);

// Add your alias AND preserve Expo Router
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "@": path.resolve(__dirname),
};

// Wrap with NativeWind
config = withNativeWind(config, {
  input: "./global.css",
});

module.exports = config;
