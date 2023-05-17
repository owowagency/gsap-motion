import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://owowagency.github.io/gsap-motion",
  build: {
    rollupOptions: {
      output: {
        dir: "docs",
      },
      input: {
        main: resolve(__dirname, "index.html"),
        marquee: resolve(__dirname, "lib/marquee/index.html"),
        pointer: resolve(__dirname, "lib/pointer/index.html"),
      },
    },
  },
});
