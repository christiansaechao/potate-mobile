import { SessionType, TimerMode, TimerState } from "@/types/types";

export type Option<T> = {
  label: string;
  value: T;
};

export type PickerProps<T> = {
  state: T;
  options: Option<T>[];
  setState: React.Dispatch<React.SetStateAction<T>>;
};

export interface IUserContext {
  name: string | null;
  email: string | null;
  FOCUS: number | null;
  SHORT_BREAK: number | null;
  LONG_BREAK: number | null;
  vibration: number | null;
  weekly_goal: number | null;
  exp: number | null;
  level: number | null;
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
