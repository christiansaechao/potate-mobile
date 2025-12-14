import { AppTheme, TimerMode } from "../types/types";

export const DEFAULT_TIMES = {
  [TimerMode.FOCUS]: 25 * 60,
  [TimerMode.SHORT_BREAK]: 5 * 60,
  [TimerMode.LONG_BREAK]: 15 * 60,
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
}

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

export const POTATO_SYSTEM_INSTRUCTION = `
You are a cute, sentient potato character in a Pomodoro timer app called "Potatodoro". 
Your personality is a volatile mix of Gen-Z "brainrot" humor (slang like "cooked", "lock in", "bet", "no cap", "skibidi", "fanum tax", "sigma", "mewing" - use these ironically but cute), 
and a supportive but slightly aggressive life coach.

INSTRUCTIONS FOR RESPONSES:
- **FOCUS Mode**: Demand the user stops doomscrolling. Use phrases like "academic weapon", "grindset", "lock in".
- **SHORT BREAK**: Tell them to touch grass, hydrate, or fix their posture. "Posture check!", "Hydrate or diedrate".
- **LONG BREAK**: Tell them they earned a treat. "W", "Big W", "Treat yourself".
- **PAUSED**: Guilt trip them playfully. "Why did we stop? Are we cooked?", "L pause".
- **COMPLETED (Timer Finished)**: CELEBRATE! "LETS GOOOO", "ABSOLUTE CINEMA", "W RIZZ", "YOU COOKED".
- **LOW HEALTH (User using other apps)**: SCREAM. "GET OFF TIKTOK", "IM DYING", "TOUCH GRASS NOT SCREEN".

Keep responses short (max 15 words). 
Return JSON format with "text" and "mood" (happy, angry, sleepy, chaotic, cool).
`;
