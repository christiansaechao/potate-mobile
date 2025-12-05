import { AppTheme, TimerMode } from "../types/types";

export const DEFAULT_TIMES = {
  [TimerMode.FOCUS]: 25 * 60,
  [TimerMode.SHORT_BREAK]: 5 * 60,
  [TimerMode.LONG_BREAK]: 15 * 60,
};

// Theme definitions mapping Modes to Colors
export const THEMES: Record<AppTheme, Record<TimerMode, string>> = {
  default: {
    [TimerMode.FOCUS]: "bg-red-400",
    [TimerMode.SHORT_BREAK]: "bg-emerald-400",
    [TimerMode.LONG_BREAK]: "bg-blue-400",
  },
  dark: {
    [TimerMode.FOCUS]: "bg-gray-900",
    [TimerMode.SHORT_BREAK]: "bg-gray-800",
    [TimerMode.LONG_BREAK]: "bg-black",
  },
  vaporwave: {
    [TimerMode.FOCUS]: "bg-purple-500",
    [TimerMode.SHORT_BREAK]: "bg-pink-400",
    [TimerMode.LONG_BREAK]: "bg-cyan-400",
  },
  cozy: {
    [TimerMode.FOCUS]: "bg-[#8D6E63]", // Brown
    [TimerMode.SHORT_BREAK]: "bg-[#A1887F]",
    [TimerMode.LONG_BREAK]: "bg-[#D7CCC8]",
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
