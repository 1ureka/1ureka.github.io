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

const getObjectsByTypes = async (
  types: SQLiteObjectType[] = ["table"]
): Promise<{ type: SQLiteObjectType; name: string }[]> => {
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

export { getDbBytes, getObjectsByTypes };
export type { SQLiteObjectType };
