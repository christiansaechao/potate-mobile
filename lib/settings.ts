import { intervals, sessions, userSettings } from "@/db/schema";
import { db } from "../db/client";
import { IUserContext } from "@/types/settings.types";
import { eq } from "drizzle-orm";

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

  async updateUserSettings({
    newSettings,
  }: {
    newSettings: Partial<IUserContext>;
  }) {
    const user = await this.getUser();
    await db
      .update(userSettings)
      .set(newSettings)
      .where(eq(userSettings.id, user[0].id))
      .returning();

    return { success: true };
  },

  async resetUserData() {
    await db.delete(intervals);
    await db.delete(sessions);
    await db.delete(userSettings);

    return { success: true };
  },
};

export default userOps;
