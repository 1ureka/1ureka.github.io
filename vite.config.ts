import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import routesJson from "./src//routes.json" with { type: "json" };
import { fromEntries, toEntries } from "./src/utils/typedBuiltins.ts";
const entries = toEntries(routesJson);
const input = fromEntries(entries.map(([key, value]) => [key, value.dev]));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { rollupOptions: { input }, chunkSizeWarningLimit: 1000 },
  resolve: { alias: { "@": "/src" } },
});
