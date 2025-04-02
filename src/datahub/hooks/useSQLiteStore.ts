import { create } from "zustand";
import { SQLiteClient } from "../data/SQLiteClient";

interface SQLiteState {
  client: SQLiteClient | null;
  setClient: (client: SQLiteClient) => void;
  resetClient: () => void;
}

export const useSQLiteStore = create<SQLiteState>((set) => ({
  client: null,
  setClient: (client) => set({ client }),
  resetClient: () => set({ client: null }),
}));
