import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { DEFAULT_TIMES, XP_PER_MINUTE } from "../constants/constants";
import { getPotatoWisdom } from "../services/potatoWisdomLocal";
import userOps from "@/lib/settings";
import { SessionType, TimerMode, TimerState } from "@/types/types";
import { IUseTimer } from "@/types/settings.types";
import { achievementOps, AchievementDef } from "../lib/achievements";
import { calculateLevel } from "../lib/leveling";

export const useTimer: IUseTimer = (
  mode,
  setMode,
  health,
  setHealth,
  StartSession,
  StopSession,
  StartInterval,
  StopInterval,
  setExp,
  user
) => {
  // ✅ Always compute current mode duration from latest user settings
  // Use ?? (not ||) so 0 doesn't get treated as "missing"
  const userTimeSeconds =
    user?.[mode] != null ? Number(user[mode]) * 60 : undefined;
  const modeDuration = userTimeSeconds ?? DEFAULT_TIMES[mode];
  const [state, setState] = useState<TimerState>(TimerState.IDLE);
  const [timeLeft, setTimeLeft] = useState<number>(modeDuration);
  const [session, setSession] = useState<SessionType | null>(null);
  const [achievementToToast, setAchievementToToast] =
    useState<AchievementDef | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopLocalTimer = useCallback(() => {
    if (timerRef.current == null) return;
    clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const fetchQuote = useCallback(
    async (m: TimerMode, s: TimerState, hp: number) => {
      return getPotatoWisdom(m, s, hp);
    },
    []
  );

  // ✅ When user settings arrive / change, sync timeLeft *only if not running*
  // (prevents overwriting countdown mid-session)
  useEffect(() => {
    if (state === TimerState.RUNNING) return;

    setTimeLeft(modeDuration);
  }, [modeDuration, state]);

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      // stop everything about the current session
      StopInterval();
      StopSession(health);
      stopLocalTimer();

      setMode(newMode);
      setState(TimerState.IDLE);

      // ✅ IMPORTANT: compute duration based on newMode (not old mode)
      const newDuration = user?.[newMode] ?? DEFAULT_TIMES[newMode];
      setTimeLeft(newDuration);

      setSession(null);
    },
    [StopSession, StopInterval, health, setMode, stopLocalTimer, user]
  );

  const toggleTimer = useCallback(async () => {
    // 🔹 Case 1: IDLE → start a new session
    if (state === TimerState.IDLE) {
      try {
        const sessionRes = await StartSession(mode);
        setSession(sessionRes);
        StartInterval(sessionRes.id);
        setHealth(100);
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

    // 🔹 Case 4: COMPLETED → start fresh session
    if (state === TimerState.COMPLETED) {
      try {
        setTimeLeft(modeDuration);
        const sessionRes = await StartSession(mode);
        setSession(sessionRes);
        StartInterval(sessionRes.id);
        setHealth(100);
        setState(TimerState.RUNNING);
      } catch (err) {
        console.error("Failed to start session", err);
      }
      return;
    }
  }, [
    state,
    mode,
    modeDuration,
    StartSession,
    StartInterval,
    StopInterval,
    setHealth,
    session,
  ]);

  const resetTimer = useCallback(() => {
    StopInterval();
    StopSession(health);
    stopLocalTimer();

    setState(TimerState.IDLE);
    setTimeLeft(modeDuration);
    setHealth(100);
    setSession(null);
  }, [
    modeDuration,
    setHealth,
    StopInterval,
    StopSession,
    health,
    stopLocalTimer,
  ]);

  // Timer countdown + health regen
  useEffect(() => {
    if (state !== TimerState.RUNNING) return;

    timerRef.current = setInterval(() => {
      // ⏳ countdown
      setTimeLeft((t) => {
        if (t <= 1) {
          stopLocalTimer();
          StopSession(health, 1);

          // Award XP
          setExp((prev) => {
            const minutes = modeDuration / 60;
            const baseReward = XP_PER_MINUTE[mode] * minutes;
            const reward =
              Math.floor(baseReward) + Math.floor(Math.random() * 6) - 3;
            const newExp = prev + Math.max(1, reward);
            userOps.updateUserSettings({ exp: newExp });

            // Check for achievements
            const newLevel = calculateLevel(newExp);
            const context = {
              level: newLevel,
              totalSessions: 0, // Not fully tracked yet
              dailySessions: 0, // Not fully tracked yet
              sessionDuration: modeDuration / 60,
              timeOfDay: new Date().getHours(),
              isPerfectWeek: false,
            };

            achievementOps.checkUnlocks(context).then((newlyUnlocked) => {
              if (newlyUnlocked.length > 0) {
                setAchievementToToast(newlyUnlocked[0]);
                setTimeout(() => setAchievementToToast(null), 5000);
              }
            });

            return newExp;
          });

          fetchQuote(mode, TimerState.COMPLETED, health);
          setState(TimerState.COMPLETED);

          // ✅ reset display to current mode duration
          return modeDuration;
        }

        return t - 1;
      });

      if (AppState.currentState === "active") {
        setHealth((h: number) => Math.min(100, h + 0.05));
      }
    }, 1000);

    return () => {
      stopLocalTimer();
    };
  }, [
    state,
    mode,
    modeDuration,
    fetchQuote,
    health,
    setHealth,
    StopSession,
    setExp,
    stopLocalTimer,
  ]);

  return {
    mode,
    state,
    setState,
    timeLeft,
    setTimeLeft,
    switchMode,
    toggleTimer,
    resetTimer,
    fetchQuote,
    achievementToToast,
  };
};
