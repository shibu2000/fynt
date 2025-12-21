import { type SQLiteDatabase } from "expo-sqlite";

export const DATABASE_VERSION = 1;

export default async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const row = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  let currentDbVersion = row?.user_version ?? 0;

  // console.log("currentDbVersion", currentDbVersion);

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      datetime TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('expense', 'income')));
    `);

  currentDbVersion = 1;

  // future migrations:
  // if (currentDbVersion === 1) { ...; currentDbVersion = 2; }

  // persist version
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
