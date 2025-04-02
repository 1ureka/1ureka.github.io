import { useEffect } from "react";
import { useSQLiteStore } from "./useSQLiteStore";
import { SQLiteClient } from "../data/SQLiteClient";

import forumDb from "@/assets/db/forum.db?url";
const databases = {
  forum: forumDb,
};

export function useSqliteInitializer() {
  const setClient = useSQLiteStore((s) => s.setClient);

  useEffect(() => {
    // TODO: const dbName = searchParams.get("db");

    const client = new SQLiteClient({
      dbPath: databases["forum"],
      storageKey: `sqlite-db-${"forum"}`,
    });

    setClient(client);
  }, [setClient]);
}
