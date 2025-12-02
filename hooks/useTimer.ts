import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_TIMES } from "../constants";
import { getPotatoWisdom } from "../services/potatoWisdomLocal";
import { TimerMode, TimerState } from "../types";

export const useTimer = (
  health: number,
  setHealth: (h: number | ((h: number) => number)) => void
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

  const switchMode = useCallback((newMode: TimerMode) => {
    setMode(newMode);
    setState(TimerState.IDLE);
    setTimeLeft(DEFAULT_TIMES[newMode]);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const toggleTimer = useCallback(() => {
    setState((prev) =>
      prev === TimerState.RUNNING ? TimerState.PAUSED : TimerState.RUNNING
    );
  }, []);

  const resetTimer = useCallback(() => {
    setState(TimerState.IDLE);
    setTimeLeft(DEFAULT_TIMES[mode]);
    if (timerRef.current) clearInterval(timerRef.current);

    // Reset health when resetting the timer
    setHealth(100);
  }, [mode, setHealth]);

  // Timer countdown + health regen
  useEffect(() => {
    if (state !== TimerState.RUNNING) return;

    timerRef.current = window.setInterval(() => {
      // ⏳ countdown
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setState(TimerState.COMPLETED);

          // Fetch wisdom with final health
          fetchQuote(mode, TimerState.COMPLETED, health);

          return 0;
        }
        return t - 1;
      });

      // ❤️ Regen health slowly if app is focused
      if (!document.hidden) {
        setHealth((h: number) => Math.min(100, h + 0.05)); // 20secs + 1% health
      }
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [state, mode, fetchQuote, health, setHealth]);

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
