// import { viteSingleFile } from "vite-plugin-singlefile";
import react from "@vitejs/plugin-react";
import routesJson from "./src/forum/utils/routes.json";
import { defineConfig } from "vite";

function fromEntries<K extends PropertyKey, V>(entries: [K, V][]): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}

function toEntries<T extends Record<PropertyKey, unknown>>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

const entries = toEntries(routesJson);
const input = fromEntries(entries.map(([key, value]) => [key, `/src/forum/pages${value}/index.html`]));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { rollupOptions: { input }, chunkSizeWarningLimit: 1000 },
  resolve: { alias: { "@": "/src" } },
});
