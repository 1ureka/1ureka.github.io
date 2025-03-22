import { defineConfig } from "vite";
// import { viteSingleFile } from "vite-plugin-singlefile";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "src/forum/index.html",
        login: "src/forum/pages/login/index.html",
        register: "src/forum/pages/register/index.html",
        post: "src/forum/pages/post/index.html",
        posts: "src/forum/pages/posts/index.html",
        search: "src/forum/pages/search/index.html",
        users: "src/forum/pages/users/index.html",
        verify: "src/forum/pages/verify/index.html",
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  resolve: { alias: { "@": "/src" } },
});
