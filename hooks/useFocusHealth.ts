import { useEffect, useRef } from "react";
import { TimerState } from "../types";

export const useFocusHealth = (
  state: TimerState,
  setHealth: any,
  fetchQuote: any,
  mode: any
) => {
  const healthRef = useRef<number | null>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && state === TimerState.RUNNING) {
        // start damage
        if (healthRef.current) clearInterval(healthRef.current);
        healthRef.current = window.setInterval(() => {
          setHealth((prev: number) => Math.max(0, prev - 1));
        }, 1000 * 10);
      } else {
        // stop damage
        if (healthRef.current) clearInterval(healthRef.current);
        setHealth((prev: number) => {
          if (prev < 80 && state === TimerState.RUNNING) {
            fetchQuote(mode, state, prev);
          }
          return prev;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (healthRef.current) clearInterval(healthRef.current);
    };
  }, [state, setHealth, fetchQuote, mode]);
};
