import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { sessions } from "../db/schemas/sessions";

const sessionOps = {
  async getSessions() {
    const result = await db.select().from(sessions);
    return result;
  },

  async createSession(mode: string) {
    const result = await db
      .insert(sessions)
      .values({
        mode: mode,
        created_at: Date.now(),
        updated_at: Date.now(),
      })
      .returning()
      .then((res) => res[0]);

    return result;
  },

  async updateSession(id: number, health: number, completed?: number) {
    await db
      .update(sessions)
      .set({
        ended_at: Date.now(),
        potato_health: health,
        completed: completed,
      })
      .where(eq(sessions.id, id));
  },
};

export default sessionOps;
