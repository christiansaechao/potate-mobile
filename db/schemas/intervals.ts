import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { sessions } from "./sessions";

/**
 * Stats
 * # of intervals, count number of times stopped pomodoro timer
 * # get length of time of focused time average
 */

/** 1 Session - 25 minutes
 * interval 1: 00:00 - 01:00;
 * interval 2: 01:00 - 15:00;
 * interval 3: 15:00 - 25:00;
 */

export const intervals = sqliteTable("intervals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: integer("session_id").references(() => sessions.id).notNull(),
  startTime: integer("start_time").notNull(),
  endTime: integer("end_time"),
});

export type Interval = typeof intervals.$inferSelect;
export type NewInterval = typeof intervals.$inferInsert;
