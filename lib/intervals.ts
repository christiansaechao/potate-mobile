import { intervals, sessions } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { db } from "../db/client";

const intervalOps = {
  async getIntervals() {
    const result = await db.select().from(intervals);

    return result;
  },

  async getIntervalsBySessionMode(mode: string) {
    // query sessions
    const allSessions = await db
      .select({ id: sessions.id })
      .from(sessions)
      .where(eq(sessions.mode, mode));
    console.log(mode, allSessions);
    const allIntervals = await db
      .select()
      .from(intervals)
      .where(
        inArray(
          intervals.sessionId,
          allSessions.map((x) => x.id)
        )
      );
    return allIntervals;
  },

  async getIntervalsById(sessionId: number) {
    const result = await db
      .select()
      .from(intervals)
      .where(eq(intervals.sessionId, sessionId));

    return result;
  },

  async createInterval(sessionId: number) {
    const result = await db
      .insert(intervals)
      .values({
        sessionId: sessionId,
        startTime: Date.now(),
      })
      .returning()
      .then((res) => res[0]);

    return result;
  },

  async updateIntervals(id: number) {
    await db
      .update(intervals)
      .set({ endTime: Date.now() })
      .where(eq(intervals.id, id));
  },
};

export default intervalOps;
