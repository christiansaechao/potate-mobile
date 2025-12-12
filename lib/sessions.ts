import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { sessions } from "../db/schemas/sessions";

const sessionOps = {
  async getSessions() {
    const result = await db.select().from(sessions);
    return result;
  },

  async getSessionsByMode(mode: string) {
    const result = await db
      .select()
      .from(sessions)
      .where(eq(sessions.mode, mode));
    return result;
  },

  async createSession(mode: string) {
    const result = await db
      .insert(sessions)
      .values({
        mode: mode,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
      .returning()
      .then((res) => res[0]);

    return result;
  },

  async updateSession(id: number, health: number, completed?: number) {
    await db
      .update(sessions)
      .set({
        endedAt: Date.now(),
        potatoHealth: health,
        completed: completed,
      })
      .where(eq(sessions.id, id));
  },
};

export default sessionOps;
