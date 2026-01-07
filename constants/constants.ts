import { AppTheme, TimerMode } from "../types/types";

export const DB_DEFAULT_TIMES = {
  [TimerMode.FOCUS]: "focus_duration",
  [TimerMode.SHORT_BREAK]: "short_break_duration",
  [TimerMode.LONG_BREAK]: "long_break_duration",
};

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
    { label: "5 min", value: 300 },
    { label: "10 min", value: 600 },
    { label: "15 min", value: 900 },
    { label: "20 min", value: 1200 },
    { label: "25 min", value: 1500 },
    { label: "30 min", value: 1800 },
    { label: "45 min", value: 2700 },
    { label: "60 min", value: 3600 },
  ],

  SHORT_BREAK: [
    { label: "5 min", value: 300 },
    { label: "10 min", value: 600 },
    { label: "15 min", value: 900 },
  ],

  LONG_BREAK: [
    { label: "15 min", value: 900 },
    { label: "20 min", value: 1200 },
    { label: "30 min", value: 1800 },
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
    { label: "1 hr", value: 3600 },
    { label: "2 hrs", value: 7200 },
    { label: "4 hrs", value: 14400 },
    { label: "6 hrs", value: 21600 },
    { label: "8 hrs", value: 28800 },
    { label: "10 hrs", value: 36000 },
    { label: "20 hrs", value: 72000 },
    { label: "40 hrs", value: 144000 },
    { label: "60 hrs", value: 216000 },
  ],
};
