import { userSettings } from "@/db/schema";
import { db } from "../db/client";

const userOps = {
  async getUser() {
    const result = await db.select().from(userSettings);
    return result;
  },

  async getAllSettings() {
    const result = await db.select().from(userSettings);

    if (result.length === 0) {
      const result = await db
        .insert(userSettings)
        .values({ name: "default", email: "default" })
        .returning()
        .then((res) => res[0]);

      return result;
    }

    return result;
  },

  async createUserSettings(settings: {}) {
    const result = await db.insert(userSettings).values(settings);
    return result;
  },

  async updateUserSettings(settings: {}) {
    await db.update(userSettings).set({ ...settings });
  },
};

export default userOps;
