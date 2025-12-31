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

  async updateUserSettings(
    settings: {},
    updateUser?: (user: IUserContext) => void
  ) {
    const user = await db
      .update(userSettings)
      .set({ ...settings })
      .returning();

    if (user && updateUser) {
      updateUser({
        name: user[0].name,
        email: user[0].email,
        FOCUS: user[0].focus_duration,
        SHORT_BREAK: user[0].short_break_duration,
        LONG_BREAK: user[0].long_break_duration,
        vibration: user[0].vibration,
        weekly_goal: user[0].weekly_goal,
        exp: user[0].exp,
        level: user[0].level,
      });
    }
  },

  async resetUserData() {
    await db.delete(intervals);
    await db.delete(sessions);
    await db.delete(userSettings);

    return { success: true };
  },
};

export default userOps;
