import * as Notifications from "expo-notifications";
import { Dispatch, useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { DEFAULT_TIMES } from "../constants/constants";
import { TimerMode, TimerState } from "../types/types";
import userOps from "@/lib/settings";

export const useLeaveAppConsequence = (
  state: TimerState,
  setHealth: Dispatch<React.SetStateAction<number>>,
  setState: Dispatch<React.SetStateAction<TimerState>>,
  setTimeLeft: Dispatch<React.SetStateAction<number>>,
  fetchQuote: any,
  mode: TimerMode,
  setExp: (val: number) => void
) => {
  const healthRef = useRef<number | null>(null);
  const notificationRef = useRef<string | null>(null);
  const deathRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState: AppStateStatus) => {
        if (nextAppState === "background" && state === TimerState.RUNNING) {
          //   setState(TimerState.PAUSED);
          // 30 second timer here
          let countdown = 45;
          deathRef.current = setInterval(() => {
            countdown--;
            console.log("death countdown:", countdown);
            if (countdown <= 0) {
              console.log("potato dead");
              if (deathRef.current) clearInterval(deathRef.current);
              setHealth(0);
              setState(TimerState.IDLE);
              setTimeLeft(DEFAULT_TIMES[mode]);
              // Reset exp on death
              setExp(0);
              userOps.updateUserSettings({ newSettings: { exp: 0 } });
            }
          }, 1000); // every 1 second

          // 15 second notif here
          notificationRef.current =
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "HEY STOP!",
                body: "You have 30 seconds left until your potato dies, go back!",
              },
              trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: 15,
                repeats: false,
              },
            });

          // start damage
          if (healthRef.current) clearInterval(healthRef.current);
          healthRef.current = setInterval(() => {
            setHealth((prev: number) => Math.max(0, prev - 5));
          }, 1000 * 10);
        } else if (nextAppState === "active") {
          // stop damage
          if (healthRef.current) clearInterval(healthRef.current);
          // stop death timer
          if (deathRef.current) clearInterval(deathRef.current);
          // stop notificaiton timer
          if (notificationRef.current) {
            Notifications.cancelScheduledNotificationAsync(
              notificationRef.current
            );
          }

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
      if (deathRef.current) clearInterval(deathRef.current);
      if (notificationRef.current) {
        Notifications.cancelScheduledNotificationAsync(notificationRef.current);
      }
    };
  }, [state, setHealth, setState, setTimeLeft, fetchQuote, mode, setExp]);
};
