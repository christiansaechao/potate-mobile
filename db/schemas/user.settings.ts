import { DEFAULT_TIMES } from "@/constants/constants";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userSettings = sqliteTable("settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email"),
  focus_duration: integer("focus_duration").default(DEFAULT_TIMES.FOCUS),
  short_break_duration: integer("short_break_duration").default(
    DEFAULT_TIMES.SHORT_BREAK
  ),
  long_break_duration: integer("long_break_duration").default(
    DEFAULT_TIMES.LONG_BREAK
  ),
  vibration: integer("vibration").default(0),
  weekly_goal: integer("weekly_goal").default(5),
});
