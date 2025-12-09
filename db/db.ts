import * as SQLite from "expo-sqlite";

const DB_NAME = "pomodoro";
let db: SQLite.SQLiteDatabase | null = null;

export async function getDB() {
  if (!db) {
    await SQLite.openDatabaseAsync(DB_NAME);
  }
  return db;
}
