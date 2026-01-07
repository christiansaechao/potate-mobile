import { SessionType, TimerMode, TimerState } from "@/types/types";

export type Option<T> = {
  label: string;
  value: T;
};

export type PickerProps<T> = {
  state: T;
  options: Option<T>[];
  setState: (val: T) => void;
};

export interface IUserContext {
  name: string;
  email: string;
  FOCUS: number;
  SHORT_BREAK: number;
  LONG_BREAK: number;
  vibration: number;
  weekly_goal: number;
  weekly_focus_time_goal: number;
  theme: string;
  exp: number;
  level: number;
}

export type IUseTimer = (
  mode: TimerMode,
  setMode: (mode: TimerMode) => void,
  health: number,
  setHealth: (h: number | ((h: number) => number)) => void,
  StartSession: (mode: string) => Promise<SessionType>,
  StopSession: (h: number, completed?: number) => void,
  StartInterval: (id: number) => void,
  StopInterval: () => void,
  setExp: React.Dispatch<React.SetStateAction<number>>,
  user: IUserContext
) => {
  mode: TimerMode;
  state: TimerState;
  setState: React.Dispatch<React.SetStateAction<TimerState>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  switchMode: (newMode: TimerMode) => void;
  toggleTimer: () => void;
  resetTimer: () => void;
  fetchQuote: (
    m: TimerMode,
    s: TimerState,
    hp: number
  ) => Promise<{ text: string; mood: string }>;
};
