import { intervals, sessions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "../db/client";

const intervalOps = {
  async getIntervals(sessionId: number) {
    const result = await db
      .select()
      .from(intervals)
      .where(eq(sessions.id, sessionId));
      
    return result;
  },

  async createIntervals(sessionId: number) {
    const result = await db.insert(intervals).values({
      sessionId: sessionId,
      startTime: Date.now(),
      endTime: null,
    });

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
