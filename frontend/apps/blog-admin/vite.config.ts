import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";
/// <reference types='vitest' />
import { defineConfig } from "vite";

const { parsed, error } = config();
if (error) {
  process.exit();
}
export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/apps/blog-admin",

  server: {
    port: Number(parsed?.PUBLIC_FRONTEND_BLOG_ADMIN_PORT),
    host: "0.0.0.0",
  },

  preview: {
    port: Number(parsed?.PUBLIC_FRONTEND_BLOG_ADMIN_PORT),
    host: "0.0.0.0",
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: "../../dist/apps/blog-admin",
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest",
    },
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

    reporters: ["default"],
    coverage: {
      reportsDirectory: "../../coverage/apps/blog-admin",
      provider: "v8",
    },
  },
});
