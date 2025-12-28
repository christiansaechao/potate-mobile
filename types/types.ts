export enum TimerMode {
  FOCUS = "FOCUS",
  SHORT_BREAK = "SHORT_BREAK",
  LONG_BREAK = "LONG_BREAK",
}

export enum TimerState {
  IDLE = "IDLE",
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  COMPLETED = "COMPLETED",
}

export type timerState = "IDLE" | "RUNNING" | "PAUSED" | "COMPLETED";

export type AppTheme = "default" | "dark" | "vaporwave" | "cozy";

export interface PotatoQuote {
  text: string;
  mood: "happy" | "angry" | "sleepy" | "chaotic" | "cool";
}

export interface TimerConfig {
  focus: number;
  shortBreak: number;
  longBreak: number;
}

export type IntervalsType = {
  id: number;
  sessionId: number;
  startTime: number;
  endTime: number | null;
}[];

export type SessionType = {
  id: number;
  mode: string;
  createdAt: number;
  updatedAt: number;
  endedAt: number | null;
  potatoHealth: number | null;
  completed: number | null;
};

export type StatsType = {
  totalSessions: number;
  totalCompletedSessions: number;
  timeFocused: string;
  shortBreak: string;
  longBreak: string;
  allBreaks: string;
};
//should fix this later (add normalizer)
export type SettingsType = {
  email: string | null;
  id: number | null;
  level: number | null;
  exp: number | null;
  focus_duration: number | null;
  short_break_duration: number | null;
  long_break_duration: number | null;
  vibration: number | null;
  weekly_goal: number | null;
  name: string | null;
};
