import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        motion: resolve(__dirname, "lib", "motion.ts"),
        pointer: resolve(__dirname, "lib", "pointer.ts"),
      },
      name: "gsapCollection",
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
        },
      },
    },
  },
  plugins: [
    dts({
      outputDir: resolve(__dirname, "dist"),
      insertTypesEntry: true,
    }),
  ],
});
