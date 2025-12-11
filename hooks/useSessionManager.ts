import { Interval } from "@/db/schema";
import Intervals from "@/lib/intervals";
import Sessions from "@/lib/sessions";
import { useCallback, useState } from "react";

export const useSessionManager = () => {
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [currentInterval, setCurrentInterval] = useState<Interval | null>(null);

  const StartSession = useCallback(
    async (mode: string) => {
      try {
        const result = await Sessions.createSession(mode);
        setSessionId(result.id);
      } catch (err) {
        console.error(err);
      }
    },
    [sessionId]
  );

  const StopSession = useCallback(
    async (health: number, completed?: number) => {
      if (!sessionId) return;

      try {
        await Sessions.updateSession(sessionId, health, completed);
      } catch (err) {
        console.error(err);
      }
    },
    [sessionId]
  );

  const StartInterval = useCallback(async () => {
    try {
      const result = await Intervals.createInterval(sessionId);
      setCurrentInterval(result);
    } catch (err) {
      console.error(err);
    }
  }, [sessionId]);

  const StopInterval = useCallback(async () => {
    if (!currentInterval) return;

    try {
      await Intervals.updateIntervals(currentInterval.id);
    } catch (err) {
      console.error(err);
    }
  }, [currentInterval]);

  return {
    sessionId,
    currentInterval,
    StartSession,
    StopSession,
    StartInterval,
    StopInterval,
  };
};
