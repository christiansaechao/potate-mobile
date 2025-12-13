import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { DEFAULT_TIMES } from "../constants/constants";
import { getPotatoWisdom } from "../services/potatoWisdomLocal";
import { SessionType, TimerMode, TimerState } from "../types/types";

type IUseTimer = (
  mode: TimerMode,
  setMode: (mode: TimerMode) => void,
  health: number,
  setHealth: (h: number | ((h: number) => number)) => void,
  StartSession: (mode: string) => Promise<SessionType>,
  StopSession: (h: number, completed?: number) => void,
  StartInterval: (id: number) => void,
  StopInterval: () => void
) => {
  mode: TimerMode;
  state: TimerState;
  setState: React.Dispatch<React.SetStateAction<TimerState>>;
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
  mode,
  setMode,
  health,
  setHealth,
  StartSession,
  StopSession,
  StartInterval,
  StopInterval
) => {
  const [state, setState] = useState<TimerState>(TimerState.IDLE);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMES[TimerMode.FOCUS]);
  const [session, setSession] = useState<SessionType | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchQuote = useCallback(
    async (m: TimerMode, s: TimerState, hp: number) => {
      return await getPotatoWisdom(m, s, hp);
    },
    []
  );

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      // stop everything about the current session
      StopInterval();
      StopSession(health);

      if (timerRef.current) clearInterval(timerRef.current);

      setMode(newMode);
      setState(TimerState.IDLE);
      setTimeLeft(DEFAULT_TIMES[newMode]);
      setSession(null);
    },
    [StopSession, StopInterval, health, setMode]
  );

  const toggleTimer = useCallback(async () => {
    // 🔹 Case 1: IDLE → start a new session
    if (state === TimerState.IDLE) {
      try {
        const sessionRes = await StartSession(mode);
        setSession(sessionRes);
        StartInterval(sessionRes.id);
        setState(TimerState.RUNNING);
      } catch (err) {
        console.error("Failed to start session", err);
      }
      return;
    }

    // 🔹 Case 2: RUNNING → pause (stop interval, keep session)
    if (state === TimerState.RUNNING) {
      StopInterval();
      setState(TimerState.PAUSED);
      return;
    }

    // 🔹 Case 3: PAUSED → resume (reuse existing session.id)
    if (state === TimerState.PAUSED) {
      if (!session?.id) {
        console.warn("No active session to resume");
        return;
      }
      StartInterval(session.id);
      setState(TimerState.RUNNING);
      return;
    }
  }, [state, mode, StartSession, StartInterval, StopInterval, session]);

  const resetTimer = useCallback(() => {
    StopInterval();
    StopSession(health);

    if (timerRef.current) clearInterval(timerRef.current);

    setState(TimerState.IDLE);
    setTimeLeft(DEFAULT_TIMES[mode]);
    setHealth(100);
    setSession(null);
  }, [mode, setHealth, StopInterval, StopSession, health]);

  // Timer countdown + health regen
  useEffect(() => {
    if (state !== TimerState.RUNNING) return;

    timerRef.current = setInterval(() => {
      // ⏳ countdown
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setState(TimerState.COMPLETED);
          StopSession(health, 1);
          // fire and forget wisdom
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

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state, mode, fetchQuote, health, setHealth, StopSession]);

  return {
    mode,
    state,
    setState,
    timeLeft,
    switchMode,
    toggleTimer,
    resetTimer,
    fetchQuote,
  };
};
