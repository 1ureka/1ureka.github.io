import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSQLiteStore } from "./useSQLiteStore";
import { SQLiteClient } from "../data/SQLiteClient";

import { toKeys } from "@/utils/typedBuiltins";
import forumDb from "@/assets/db/forum.db?url";
import { useUrl } from "./url";

const databases = {
  forum: forumDb,
};

const isDbExists = (dbName: string): dbName is keyof typeof databases => {
  return toKeys(databases).includes(dbName as keyof typeof databases);
};

export function useSqliteInitializer() {
  const { searchParams } = useUrl();
  const setClient = useSQLiteStore((s) => s.setClient);
  const queryClient = useQueryClient();

  useEffect(() => {
    let dbName = searchParams.get("db");
    if (dbName === null || dbName.trim() === "") dbName = "forum";
    if (!isDbExists(dbName)) throw new Error(`要求資料庫 "${dbName}" 不存在`);

    const client = new SQLiteClient({
      dbPath: databases[dbName],
      storageKey: `sqlite-db-${dbName}`,
    });

    setClient(client);

    queryClient.resetQueries({ queryKey: [] });
  }, [setClient, searchParams, queryClient]);
}
