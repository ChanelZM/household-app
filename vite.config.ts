import svg from "@poppanator/sveltekit-svg";
import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit(), svg()],
  css: {
    devSourcemap: true,

    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  server: {
    fs: {
      allow: [
        // Allow serving files from the project root and the examples directory
        path.resolve(__dirname),
        path.resolve(__dirname, "examples"),
      ],
    },
  },
});
