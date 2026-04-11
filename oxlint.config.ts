import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["react"],
  rules: { "eslint/no-unused-vars": "error" },
});
