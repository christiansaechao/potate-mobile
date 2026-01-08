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
