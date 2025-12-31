import { intervals, sessions, userSettings } from "@/db/schema";
import { db } from "../db/client";
import { IUserContext } from "@/types/settings.types";

const userOps = {
  async getUser() {
    const result = await db.select().from(userSettings);
    return result;
  },

  async getAllSettings() {
    const result = await db.select().from(userSettings);

    if (result.length === 0) {
      const newUser = await db
        .insert(userSettings)
        .values({ name: "default", email: "default" })
        .returning()
        .then((res) => res[0]);

      return newUser;
    }

    return result[0];
  },

  async createUserSettings(settings: {}) {
    const result = await db.insert(userSettings).values(settings);
    return result;
  },

  async updateUserSettings(settings: {}) {
    const user = await db
      .update(userSettings)
      .set({ ...settings })
      .returning();

    return { success: true, data: user[0] };
  },

  async resetUserData() {
    await db.delete(intervals);
    await db.delete(sessions);
    await db.delete(userSettings);

    return { success: true };
  },
};

export default userOps;
