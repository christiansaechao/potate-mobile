import { AppTheme, TimerMode } from "../types/types";

export const DEFAULT_TIMES = {
    [TimerMode.FOCUS]: 25 * 60, // 5 sec for testing. was 25 * 60
    [TimerMode.SHORT_BREAK]: 5 * 60,
    [TimerMode.LONG_BREAK]: 15 * 60,
};

export const EXP_REWARDS = {
    [TimerMode.FOCUS]: 25, // increase for faster progression
    [TimerMode.SHORT_BREAK]: 1,
    [TimerMode.LONG_BREAK]: 2,
};

export const SETTINGS_OPTIONS = {
    POMODORO: [
        { label: "30 min", value: 30 },
        { label: "45 min", value: 45 },
        { label: "60 min", value: 60 },
    ],

    SHORT_BREAK: [
        { label: "5 min", value: 5 },
        { label: "10 min", value: 10 },
    ],

    LONG_BREAK: [
        { label: "15 min", value: 15 },
        { label: "20 min", value: 20 },
    ],
};

// Theme definitions mapping Modes to Colors
export const THEMES: Record<AppTheme, Record<TimerMode, string>> = {
    default: {
        [TimerMode.FOCUS]: "bg-orange-200",
        [TimerMode.SHORT_BREAK]: "bg-green-200",
        [TimerMode.LONG_BREAK]: "bg-blue-200",
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
        [TimerMode.FOCUS]: "#fed7aa", // orange-200
        [TimerMode.SHORT_BREAK]: "#bbf7d0", // green-200
        [TimerMode.LONG_BREAK]: "#bfdbfe", // blue-200
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
