import { join } from "path";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const { dependencies = {}, peerDependencies = {} } = pkg as any;
const makeRegex = (dep) => new RegExp(`^${dep}(/.*)?$`);
const excludeAll = (obj) => Object.keys(obj).map(makeRegex);
console.log(import.meta.dir);
export default defineConfig(() => {
  return {
    mode: "lib",
    build: {
      target: "es2020",
      lib: {
        entry: "./src/index.ts",
        formats: ["es", "cjs"],
        fileName: (format) => `index.qwik.${format === "es" ? "mjs" : "cjs"}`,
        outDir: join(import.meta.dir, "lib"),
      },
      rollupOptions: {
        // externalize deps that shouldn't be bundled into the library
        external: [/^node:.*/, ...excludeAll(dependencies), ...excludeAll(peerDependencies)],
      },
      outDir: join(import.meta.dir, "lib"),
    },
    plugins: [qwikVite(), tsconfigPaths()],
  };
});
