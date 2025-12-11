import * as Notifications from "expo-notifications";
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
  const notificationRef = useRef<string | null>(null);
  const deathRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState: AppStateStatus) => {
        if (nextAppState === "background" && state === TimerState.RUNNING) {
          console.log("left app - starting timers");

          //   setState(TimerState.PAUSED);
          // 30 second timer here
          deathRef.current = setTimeout(() => {
            setHealth(0);
            setState(TimerState.PAUSED);
          }, 45000); // 1000 x 45 = 45 seconds

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
            setHealth((prev: number) => Math.max(0, prev - 1));
          }, 1000 * 10);
        } else if (nextAppState === "active") {
          console.log("user came back. deathref: ", deathRef.current);
          // stop damage
          if (healthRef.current) clearInterval(healthRef.current);
          // stop death timer
          if (deathRef.current) clearTimeout(deathRef.current);
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
      if (deathRef.current) clearTimeout(deathRef.current);
      if (notificationRef.current) {
        Notifications.cancelScheduledNotificationAsync(notificationRef.current);
      }
    };
  }, [state, setHealth, fetchQuote, mode]);
};
