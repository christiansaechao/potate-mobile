/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  default: {
    text: "#2D2D2D",
    background: "#FFFDF5",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    buttonIconColor: "white",
    buttonColor: "#8B4513", // Saddle Brown
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    buttonIconColor: "black",
    buttonColor: "#ECEDEE", // Light text color for contrast
  },
  vaporwave: {
    text: "#ffffff",
    background: "#2b003b",
    tint: "#ff00ff",
    icon: "#00f0ff",
    tabIconDefault: "#bd00ff",
    tabIconSelected: "#ff00ff",
    buttonIconColor: "#2b003b",
    buttonColor: "#ff00ff", // Hot pink
  },
  cozy: {
    text: "#5D4037",
    background: "#F5F5DC", // Beige
    tint: "#8D6E63",
    icon: "#8D6E63",
    tabIconDefault: "#A1887F",
    tabIconSelected: "#5D4037",
    buttonIconColor: "#F5F5DC",
    buttonColor: "#8D6E63", // Cozy brown
  },
};

// export const Fonts = Platform.select({
//   ios: {
//     /** iOS `UIFontDescriptorSystemDesignDefault` */
//     sans: "system-ui",
//     /** iOS `UIFontDescriptorSystemDesignSerif` */
//     serif: "ui-serif",
//     /** iOS `UIFontDescriptorSystemDesignRounded` */
//     rounded: "ui-rounded",
//     /** iOS `UIFontDescriptorSystemDesignMonospaced` */
//     mono: "ui-monospace",
//   },
//   default: {
//     sans: "normal",
//     serif: "serif",
//     rounded: "normal",
//     mono: "monospace",
//   },
//   web: {
//     sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
//     serif: "Georgia, 'Times New Roman', serif",
//     rounded:
//       "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
//     mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
//   },
// });
