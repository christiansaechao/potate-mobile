import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { TimerState } from "../types/types";

export const useFocusHealth = (
  state: TimerState,
  setHealth: any,
  fetchQuote: any,
  mode: any
) => {
  const healthRef = useRef<number | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (
          nextAppState.match(/inactive|background/) &&
          state === TimerState.RUNNING
        ) {
          // start damage
          if (healthRef.current) clearInterval(healthRef.current);
          healthRef.current = setInterval(() => {
            setHealth((prev: number) => Math.max(0, prev - 1));
          }, 1000 * 10);
        } else if (nextAppState === "active") {
          // stop damage
          if (healthRef.current) clearInterval(healthRef.current);
          setHealth((prev: number) => {
            if (prev < 80 && state === TimerState.RUNNING) {
              console.log("running");
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
    };
  }, [state, setHealth, fetchQuote, mode]);
};
