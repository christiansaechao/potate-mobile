import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const achievements = sqliteTable("achievements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  achievement_id: text("achievement_id").notNull().unique(), // e.g. 'level_2', 'night_owl'
  unlocked_at: integer("unlocked_at", { mode: "timestamp" }).notNull(),
});

export type Achievement = typeof achievements.$inferSelect;
export type NewAchievement = typeof achievements.$inferInsert;
