import { useSQLiteStore } from "../hooks/useSQLiteStore";

const getClient = () => {
  const { client } = useSQLiteStore.getState();
  if (!client) throw new Error("SQLite client is not initialized.");
  return client;
};

const resetDatabase = () => {
  const client = getClient();
  return client.reset();
};

export { resetDatabase };
