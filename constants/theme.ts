import { AppTheme, TimerMode } from "../types/types";
/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const COLORS = {
  default: {
    text: "#2D2D2D",
    background: "#FFFDF5",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    buttonIconColor: "white",
    buttonColor: "#8B4513", // Saddle Brown
    tabBar: "rgba(21, 23, 25, 0.75)",
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
    tabBar: "rgba(21, 23, 24, 0.75)",
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
    tabBar: "rgba(43, 0, 59, 0.7)",
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
    tabBar: "rgba(93,64,55,0.7)",
  },
};

// Theme definitions mapping Modes to Colors
export const THEMES: Record<AppTheme, Record<TimerMode, string>> = {
  default: {
    [TimerMode.FOCUS]: `bg-[#FFFDF5]`,
    [TimerMode.SHORT_BREAK]: "bg-[#F0FDF4]",
    [TimerMode.LONG_BREAK]: "bg-[#EFF6FF]",
  },
  dark: {
    [TimerMode.FOCUS]: "bg-gray-700",
    [TimerMode.SHORT_BREAK]: "bg-gray-800",
    [TimerMode.LONG_BREAK]: "bg-slate-900",
  },
  vaporwave: {
    [TimerMode.FOCUS]: "bg-purple-500",
    [TimerMode.SHORT_BREAK]: "bg-pink-400",
    [TimerMode.LONG_BREAK]: "bg-cyan-400",
  },
  cozy: {
    [TimerMode.FOCUS]: "bg-[#ccd5ae]",
    [TimerMode.SHORT_BREAK]: "bg-[#e9edc9]",
    [TimerMode.LONG_BREAK]: "bg-[#fefae0]",
  },
};

/**
 * If we change these colors we have to change the ones up above. This is being used for custom-view and custom-text.
 * Instead of having to import { useTheme } and THEMES we just import those components
 * And then they already have our themed colors on them
 */
export const HEX_THEMES: Record<AppTheme, Record<TimerMode, string>> = {
  default: {
    [TimerMode.FOCUS]: "#FFFDF5",
    [TimerMode.SHORT_BREAK]: "#F0FDF4",
    [TimerMode.LONG_BREAK]: "#EFF6FF",
  },
  dark: {
    [TimerMode.FOCUS]: "#374151", // gray-700
    [TimerMode.SHORT_BREAK]: "#1f2937", // gray-800
    [TimerMode.LONG_BREAK]: "#0f172a", // slate-900
  },
  vaporwave: {
    [TimerMode.FOCUS]: "#a855f7", // purple-500
    [TimerMode.SHORT_BREAK]: "#f472b6", // pink-400
    [TimerMode.LONG_BREAK]: "#22d3ee", // cyan-400
  },
  cozy: {
    [TimerMode.FOCUS]: "#ccd5ae",
    [TimerMode.SHORT_BREAK]: "#e9edc9",
    [TimerMode.LONG_BREAK]: "#fefae0",
  },
};

export const RARITY_COLORS = {
  bronze: "#CD7F32",
  silver: "#A9A9A9",
  gold: "#D4AF37",
  rainbow: "#B322F2", // A vibrant violet that pops
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
