import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { sessions } from "./sessions";

export const intervals = sqliteTable("intervals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: integer("session_id").references(() => sessions.id),
  startTime: integer("start_time").notNull(),
  endTime: integer("end_time"),
});
