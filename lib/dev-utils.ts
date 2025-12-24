import { db } from "@/db/client";
import { intervals, sessions } from "@/db/schema";
import { TimerMode } from "@/types/types";

export const generateMockData = async () => {
  try {
    const today = new Date();

    const intervalsToInsert: (typeof intervals.$inferInsert)[] = [];

    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i); // Go back i days

      // Random number of sessions per day (0 to 5)
      const sessionsCount = Math.floor(Math.random() * 6);

      for (let j = 0; j < sessionsCount; j++) {
        // Randomly select mode
        // higher chance for focus
        const modeWeights = [0.6, 0.3, 0.1]; // 60% Focus, 30% Short Break, 10% Long Break

        let random = Math.random();
        let mode = TimerMode.FOCUS;

        if (random < modeWeights[0]) {
          mode = TimerMode.FOCUS;
        } else if (random < modeWeights[0] + modeWeights[1]) {
          mode = TimerMode.SHORT_BREAK;
        } else {
          mode = TimerMode.LONG_BREAK;
        }

        let durationMinutes = 25;
        if (mode === TimerMode.SHORT_BREAK) durationMinutes = 5;
        if (mode === TimerMode.LONG_BREAK) durationMinutes = 15;

        // Spread times out during the day
        const sessionTime = new Date(date);
        sessionTime.setHours(9 + j + Math.floor(Math.random() * 2), 0, 0, 0); // Start around 9am + offset

        const sessionDuration = durationMinutes * 60 * 1000;
        const endTime = new Date(sessionTime.getTime() + sessionDuration);
        const completed = Math.floor(Math.random() * 2);
        const newSession = {
          mode: mode,
          createdAt: sessionTime.getTime(),
          updatedAt: endTime.getTime(),
          endedAt: endTime.getTime(),
          potatoHealth: 100,
          completed: completed, // Mark as completed
        };

        // We need the ID to link intervals, so we might need to insert one by one or trust IDs if we could batch insert returning IDs.
        // Drizzle batch insert returning IDs is possible in SQLite.
        const insertedSession = await db
          .insert(sessions)
          .values(newSession)
          .returning({ id: sessions.id })
          .then((res) => res[0]);

        if (insertedSession) {
          intervalsToInsert.push({
            sessionId: insertedSession.id,
            startTime: sessionTime.getTime(),
            endTime: endTime.getTime(),
          });
        }
      }
    }

    if (intervalsToInsert.length > 0) {
      await db.insert(intervals).values(intervalsToInsert);
    }

    return { success: true };
  } catch (error) {
    console.error("Error generating mock data:", error);
    return { success: false, error };
  }
};
