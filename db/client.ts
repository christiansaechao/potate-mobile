import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

export const expo_db = openDatabaseSync("db.db");

export const db = drizzle(expo_db, { schema });
