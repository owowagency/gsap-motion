import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, "lib/index"),
      name: "gsapMotion",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["gsap", "rxjs"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          gsap: "gsap",
          rxjs: "rxjs",
        },
      },
    },
  },
  plugins: [
    dts({
      outputDir: path.resolve(__dirname, "dist"),
      insertTypesEntry: true,
    }),
  ],
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./lib") }],
  },
});
