import { useSQLiteStore } from "../hooks/useSQLiteStore";

function getClient() {
  const { client } = useSQLiteStore.getState();
  if (!client) throw new Error("SQLite client is not initialized.");
  return client;
}

async function getDbBytes(): Promise<number> {
  const client = getClient();
  const bytes = await client.getDatabaseSize();
  return bytes;
}

async function getTables(): Promise<string[]> {
  const client = getClient();
  const rows = await client.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");

  const data = rows.map((r) => r.name).filter((name) => typeof name === "string");
  return data;
}

async function getViews(): Promise<string[]> {
  const client = getClient();
  const rows = await client.exec("SELECT name FROM sqlite_master WHERE type='view' AND name NOT LIKE 'sqlite_%';");

  const data = rows.map((r) => r.name).filter((name) => typeof name === "string");
  return data;
}

export { getDbBytes, getTables, getViews };
