import { tryCatch } from "@/utils/tryCatch";
import { useSQLiteStore } from "../hooks/useSQLiteStore";

const getClient = () => {
  const { client } = useSQLiteStore.getState();
  if (!client) throw new Error("SQLite client is not initialized.");
  return client;
};

const getDbBytes = async () => {
  const client = getClient();
  const bytes = await client.getDatabaseSize();
  return bytes;
};

type SQLiteObjectType = "table" | "view" | "index" | "trigger";

const getObjectsByTypes = async (types: SQLiteObjectType[]) => {
  const client = getClient();
  const results: { type: SQLiteObjectType; name: string }[] = [];

  await Promise.all(
    types.map(async (type) => {
      const sql = `SELECT name FROM sqlite_master WHERE type = $type AND name NOT LIKE 'sqlite_%';`;
      const rows = await client.exec(sql, { $type: type });

      rows.forEach((row) => {
        if (typeof row.name === "string") results.push({ type, name: row.name });
      });
    })
  );

  return results;
};

const getTotalRowCount = async (types: Exclude<SQLiteObjectType, "index" | "trigger">[]) => {
  const client = getClient();
  const results: { [table: string]: number } = {};

  // 獲取所有指定類型的物件
  const objects = await getObjectsByTypes(types);

  // 對每個物件執行 COUNT(*) 查詢
  await Promise.all(
    objects.map(async ({ name }) => {
      const sql = `SELECT COUNT(*) as count FROM ${name};`;
      const result = await tryCatch(client.exec(sql));

      if (result.error) {
        console.error(`Error counting rows in ${name}:`, result.error);
        results[name] = 0;
        return;
      }

      const rows = result.data;
      if (rows.length > 0) results[name] = Number(rows[0].count ?? 0);
      else results[name] = 0;
    })
  );

  return results;
};

export { getDbBytes, getObjectsByTypes, getTotalRowCount };
export type { SQLiteObjectType };
