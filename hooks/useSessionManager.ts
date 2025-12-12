import { Interval } from "@/db/schema";
import Intervals from "@/lib/intervals";
import Sessions from "@/lib/sessions";
import { SessionType } from "@/types/types";
import { useCallback, useState } from "react";

export const useSessionManager = () => {
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [currentInterval, setCurrentInterval] = useState<Interval | null>(null);

  const StartSession = useCallback(
    async (mode: string): Promise<SessionType> => {
      try {
        const result = await Sessions.createSession(mode);

        if (!result) {
          // if createSession can return undefined/null, handle it explicitly
          throw new Error("Failed to create session");
        }

        setSessionId(result.id);
        return result;
      } catch (err) {
        console.error("Error starting session:", err);
        // rethrow so the caller still gets a rejected promise, not `undefined`
        throw err instanceof Error
          ? err
          : new Error("Unknown error starting session");
      }
    },
    []
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

  const StartInterval = useCallback(async (id: number) => {
    console.log("start interval", id);

    if (id) {
      try {
        const result = await Intervals.createInterval(id);
        setCurrentInterval(result);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

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
