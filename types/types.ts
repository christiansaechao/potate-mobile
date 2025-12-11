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
