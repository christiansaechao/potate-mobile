import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Stats
 * # of total sessions
 * time spent distracted? maybe
 *
 * # of breaks taking during session = mode("SHORT_BREAK", "LONG_BREAK")
 * time spent on a break
 *
 * Query for count of number of health sessions at 0 at the end
 * potatoes died
 *
 * how many days in a row daily goal met, longest streak
 *
 * when session ends set potato health
 */

export const sessions = sqliteTable("sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  mode: text("mode").notNull(),
  created_at: integer("created_at").notNull(),
  updated_at: integer("updated_at").notNull(),
  ended_at: integer("ended_at"),
  potato_health: integer("potato_health").default(100),
  completed: integer("completed").default(0),
});
