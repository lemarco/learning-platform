import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { config } from "dotenv";
import { qwikNxVite } from "qwik-nx/plugins";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
const { parsed, error } = config();
if (error) {
  process.exit();
}
export default defineConfig({
  cacheDir: "../../node_modules/.vite/apps/home",
  plugins: [
    qwikNxVite(),
    qwikCity(),
    qwikVite({
      client: {
        outDir: "../../dist/apps/home/client",
      },
      ssr: {
        outDir: "../../dist/apps/home/server",
      },
      tsconfigFileNames: ["tsconfig.app.json"],
    }),
    tsconfigPaths({ root: "../../" }),
  ],
  server: {
    host: "0.0.0.0",
    port: Number(parsed?.FRONTEND_HOME_APP_PORT),

    fs: {
      // Allow serving files from the project root
      allow: ["../../"],
    },
  },
  preview: {
    headers: {
      "Cache-Control": "public, max-age=600",
    },
  },
  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest",
    },
    environment: "node",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
