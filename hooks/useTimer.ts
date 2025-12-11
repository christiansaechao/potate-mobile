import { useCallback, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { DEFAULT_TIMES } from "../constants/constants";
import { getPotatoWisdom } from "../services/potatoWisdomLocal";
import { TimerMode, TimerState } from "../types/types";

type IUseTimer = (
  health: number,
  setHealth: (h: number | ((h: number) => number)) => void,
  StartSession: (mode: string) => Promise<void>,
  StopSession: (h: number, completed?: number) => void,
  StartInterval: () => void,
  StopInterval: () => void
) => {
  mode: TimerMode;
  state: TimerState;
  timeLeft: number;
  switchMode: (newMode: TimerMode) => void;
  toggleTimer: () => void;
  resetTimer: () => void;
  fetchQuote: (
    m: TimerMode,
    s: TimerState,
    hp: number
  ) => Promise<{ text: string; mood: string }>;
};

export const useTimer: IUseTimer = (
  health,
  setHealth,
  StartSession,
  StopSession,
  StartInterval,
  StopInterval
) => {
  const [mode, setMode] = useState<TimerMode>(TimerMode.FOCUS);
  const [state, setState] = useState<TimerState>(TimerState.IDLE);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMES[TimerMode.FOCUS]);

  const timerRef = useRef<number | null>(null);

  const fetchQuote = useCallback(
    async (m: TimerMode, s: TimerState, hp: number) => {
      return await getPotatoWisdom(m, s, hp);
    },
    []
  );

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      setMode(newMode);
      setState(TimerState.IDLE);
      setTimeLeft(DEFAULT_TIMES[newMode]);
      StopSession(health);
      StopInterval();
      if (timerRef.current) clearInterval(timerRef.current);
    },
    [StopSession, StopInterval, health]
  );

  const toggleTimer = useCallback(async () => {
    try {
      if (state == TimerState.IDLE) {
        await StartSession(mode);
      }
    } catch (err) {
      console.error(err);
    } finally {
      StartInterval();
      setState(TimerState.RUNNING);
    }
    setState((prev) => {
      if (prev === TimerState.RUNNING) {
        StopInterval();
        return TimerState.PAUSED;
      }
    });
  }, [StopInterval, StartInterval, StartSession, mode]);

  const resetTimer = useCallback(() => {
    StopInterval();
    StopSession(health);
    setState(TimerState.IDLE);
    setTimeLeft(DEFAULT_TIMES[mode]);
    if (timerRef.current) clearInterval(timerRef.current);
    setHealth(100);
  }, [mode, setHealth, StopInterval, StopSession, health]);

  // Timer countdown + health regen
  useEffect(() => {
    if (state !== TimerState.RUNNING) return;
    timerRef.current = setInterval(() => {
      // ⏳ countdown
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setState(TimerState.COMPLETED);
          StopSession(health, 1);
          // Fetch wisdom with final health
          fetchQuote(mode, TimerState.COMPLETED, health);

          return 0;
        }
        return t - 1;
      });

      // ❤️ Regen health slowly if app is focused
      if (AppState.currentState === "active") {
        setHealth((h: number) => Math.min(100, h + 0.05)); // 20secs + 1% health
      }
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [state, mode, fetchQuote, health, setHealth, StopSession]);

  return {
    mode,
    state,
    timeLeft,
    switchMode,
    toggleTimer,
    resetTimer,
    fetchQuote,
  };
};
