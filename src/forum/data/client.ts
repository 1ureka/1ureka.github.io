import DB_PATH from "@/assets/db/forum.db?url";
import { SQLiteClient } from "@/utils/SQLiteClient";

export const sqlite = new SQLiteClient({
  dbPath: DB_PATH,
  storageKey: "sqlite-db-forum",
});
