import { create } from "zustand";
import type { SQLiteClient } from "@/utils/SQLiteClient";

interface SQLiteState {
  client: SQLiteClient | null;
  setClient: (client: SQLiteClient) => void;
  resetClient: () => void;
}

export const SQLiteStore = create<SQLiteState>((set) => ({
  client: null,
  setClient: (client) => set({ client }),
  resetClient: () => set({ client: null }),
}));

export const getClient = () => {
  const { client } = SQLiteStore.getState();
  if (!client) throw new Error("SQLite client is not initialized.");
  return client;
};
