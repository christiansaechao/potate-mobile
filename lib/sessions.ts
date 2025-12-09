import { db } from "../db/client";
import { sessions } from "../db/schema/sessions";

const sessionOps = {
  async getSessions() {
    const result = await db.select().from(sessions);
    return result;
  },

  async createSession(mode: string) {
    const result = await db.insert(sessions).values({
      mode: mode,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    return result;
  },
};

export default sessionOps;
