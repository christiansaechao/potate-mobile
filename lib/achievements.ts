import { db } from "../db/client";
import { achievements, NewAchievement } from "../db/schema";
import { eq } from "drizzle-orm";
import { TimerMode } from "../types/types";

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: "level" | "special";
  rarity: "bronze" | "silver" | "gold" | "rainbow";
  milestone?: number; // Level or count
  predicate?: (context: AchievementContext) => boolean;
}

export interface AchievementContext {
  level: number;
  totalSessions: number;
  dailySessions: number;
  sessionDuration: number; // minutes
  timeOfDay: number; // hour (0-23)
  isPerfectWeek: boolean;
}

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  // Level Based
  {
    id: "level_2",
    title: "Sprout",
    description: "Reached Level 2!",
    icon: "🌱",
    type: "level",
    rarity: "bronze",
    milestone: 2,
  },
  {
    id: "level_5",
    title: "Tater Tot",
    description: "Reached Level 5!",
    icon: "🥔",
    type: "level",
    rarity: "bronze",
    milestone: 5,
  },
  {
    id: "level_10",
    title: "French Fry",
    description: "Reached Level 10!",
    icon: "🍟",
    type: "level",
    rarity: "silver",
    milestone: 10,
  },
  {
    id: "level_25",
    title: "Mashed Potato",
    description: "Reached Level 25!",
    icon: "🥣",
    type: "level",
    rarity: "gold",
    milestone: 25,
  },
  {
    id: "level_50",
    title: "Spud King",
    description: "Reached Level 50!",
    icon: "👑",
    type: "level",
    rarity: "gold",
    milestone: 50,
  },
  {
    id: "level_100",
    title: "Gilded Gratin",
    description: "Reached Level 100!",
    icon: "✨🥘",
    type: "level",
    rarity: "rainbow",
    milestone: 100,
  },

  // Special
  {
    id: "night_owl",
    title: "Night Owl",
    description: "Finished a session after midnight.",
    icon: "🦉",
    type: "special",
    rarity: "silver",
    predicate: (ctx) => ctx.timeOfDay >= 0 && ctx.timeOfDay < 5,
  },
  {
    id: "deep_roots",
    title: "Deep Roots",
    description: "Completed a 60-minute focus session.",
    icon: "🌲",
    type: "special",
    rarity: "gold",
    predicate: (ctx) => ctx.sessionDuration >= 60,
  },
  {
    id: "starch_streak",
    title: "Starch Streak",
    description: "5 focus sessions in one day!",
    icon: "⚡",
    type: "special",
    rarity: "rainbow",
    predicate: (ctx) => ctx.dailySessions >= 5,
  },
];

export const achievementOps = {
  async getUnlocked() {
    return await db.select().from(achievements);
  },

  async unlock(achievementId: string) {
    const newAchievement: NewAchievement = {
      achievement_id: achievementId,
      unlocked_at: new Date(),
    };
    try {
      await db.insert(achievements).values(newAchievement).run();
      return true;
    } catch (e) {
      // Achievement might already be unlocked (unique constraint)
      return false;
    }
  },

  async checkUnlocks(context: AchievementContext) {
    const unlocked = await this.getUnlocked();
    const unlockedIds = new Set(unlocked.map((a) => a.achievement_id));
    const newlyUnlocked: AchievementDef[] = [];

    for (const def of ACHIEVEMENT_DEFS) {
      if (unlockedIds.has(def.id)) continue;

      let isUnlocked = false;
      if (def.type === "level" && def.milestone) {
        isUnlocked = context.level >= def.milestone;
      } else if (def.predicate) {
        isUnlocked = def.predicate(context);
      }

      if (isUnlocked) {
        const success = await this.unlock(def.id);
        if (success) {
          newlyUnlocked.push(def);
        }
      }
    }

    return newlyUnlocked;
  },
};
