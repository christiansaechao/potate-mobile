import { useEffect, useState } from "react";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "../db/client";
import migrations from "../drizzle/migrations";

let migrationsDone = false;

export function useDbMigrations() {
  const [ready, setReady] = useState(migrationsDone);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (migrationsDone) return;

    let cancelled = false;
    console.log("Starting migrations...", db);
    (async () => {
      try {
        await migrate(db, migrations);
        migrationsDone = true;
        if (!cancelled) setReady(true);
      } catch (e) {
        console.error("Migration error:", e);
        if (!cancelled) setError(e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { ready, error };
}
