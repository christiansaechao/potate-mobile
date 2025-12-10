import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { TimerState } from "../types/types";

export const useLeaveAppConsequence = (
  state: TimerState,
  setHealth: any,
  setState: any,
  fetchQuote: any,
  mode: any
) => {
  const healthRef = useRef<number | null>(null);
  const notificationRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deathRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (
          nextAppState.match(/inactive|background/) &&
          state === TimerState.RUNNING
        ) {
          setState(TimerState.PAUSED);
          // 30 second timer here
          deathRef.current = setTimeout(() => {
            setHealth(0);
          }, 1000 * 30);
          // 15 second notif here

          // start damage
          if (healthRef.current) clearInterval(healthRef.current);
          healthRef.current = setInterval(() => {
            setHealth((prev: number) => Math.max(0, prev - 1));
          }, 1000 * 10);
        } else if (nextAppState === "active") {
          // stop damage
          if (healthRef.current) clearInterval(healthRef.current);
          // stop death timer
          if (deathRef.current) clearTimeout(deathRef.current);

          setHealth((prev: number) => {
            if (prev < 80 && state === TimerState.RUNNING) {
              fetchQuote(mode, state, prev);
            }
            return prev;
          });
        }
      }
    );

    return () => {
      subscription.remove();
      if (healthRef.current) clearInterval(healthRef.current);
      if (deathRef.current) clearTimeout(deathRef.current);
    };
  }, [state, setHealth, fetchQuote, mode]);
};
