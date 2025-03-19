import { defineConfig } from "vite";
// import { viteSingleFile } from "vite-plugin-singlefile";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { rollupOptions: { input: "src/forum/index.html" }, chunkSizeWarningLimit: 1000 },
  resolve: { alias: { "@": "/src" } },
});
