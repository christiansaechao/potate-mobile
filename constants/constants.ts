import { AppTheme, TimerMode } from "../types/types";

export const DEFAULT_TIMES = {
  [TimerMode.FOCUS]: 25 * 60, // 5 sec for testing. was 25 * 60
  [TimerMode.SHORT_BREAK]: 5 * 60,
  [TimerMode.LONG_BREAK]: 15 * 60,
};

export const XP_PER_MINUTE = {
  [TimerMode.FOCUS]: 4, // 25 min = 100 XP
  [TimerMode.SHORT_BREAK]: 2, // 5 min = 10 XP
  [TimerMode.LONG_BREAK]: 2, // 15 min = 30 XP
};

export const SETTINGS_OPTIONS = {
  POMODORO: [
    { label: "5 min", value: 5 },
    { label: "10 min", value: 10 },
    { label: "15 min", value: 15 },
    { label: "20 min", value: 20 },
    { label: "25 min", value: 25 },
    { label: "30 min", value: 30 },
    { label: "45 min", value: 45 },
    { label: "60 min", value: 60 },
  ],

  SHORT_BREAK: [
    { label: "5 min", value: 5 },
    { label: "10 min", value: 10 },
    { label: "15 min", value: 15 },
  ],

  LONG_BREAK: [
    { label: "15 min", value: 15 },
    { label: "20 min", value: 20 },
    { label: "30 min", value: 30 },
  ],

  WEEKLY_GOAL: [
    { label: "3 sessions", value: 3 },
    { label: "5 sessions", value: 5 },
    { label: "8 sessions", value: 8 },
    { label: "10 sessions", value: 10 },
    { label: "15 sessions", value: 15 },
    { label: "20 sessions", value: 20 },
  ],

  WEEKLY_FOCUS_TIME_GOAL: [
    { label: "1 hr", value: 60 },
    { label: "2 hrs", value: 120 },
    { label: "4 hrs", value: 240 },
    { label: "6 hrs", value: 360 },
    { label: "8 hrs", value: 480 },
    { label: "10 hrs", value: 600 },
    { label: "20 hrs", value: 1200 },
    { label: "40 hrs", value: 2400 },
    { label: "60 hrs", value: 3600 },
  ],
};

// Theme definitions mapping Modes to Colors
export const THEMES: Record<AppTheme, Record<TimerMode, string>> = {
  default: {
    [TimerMode.FOCUS]: "bg-[#FFFDF5]",
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

export const TAILWIND_TO_HEX = {
  "text-red-500": "#ef4444",
  "text-emerald-500": "#10b981",
  "text-blue-500": "#3b82f6",
};

export const BUTTON_COLORS = {
  [TimerMode.FOCUS]: "text-red-500",
  [TimerMode.SHORT_BREAK]: "text-emerald-500",
  [TimerMode.LONG_BREAK]: "text-blue-500",
};

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const COLORS = {
  default: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    buttonIconColor: "white",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    buttonIconColor: "black",
  },
  vaporwave: {
    text: "#ffffff",
    background: "#2b003b",
    tint: "#ff00ff",
    icon: "#00f0ff",
    tabIconDefault: "#bd00ff",
    tabIconSelected: "#ff00ff",
    buttonIconColor: "#2b003b",
  },
  cozy: {
    text: "#5D4037",
    background: "#F5F5DC", // Beige
    tint: "#8D6E63",
    icon: "#8D6E63",
    tabIconDefault: "#A1887F",
    tabIconSelected: "#5D4037",
    buttonIconColor: "#F5F5DC",
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
