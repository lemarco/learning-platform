import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { config } from "dotenv";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
config({ path: "../../../.env" });
export default defineConfig(() => {
  return {
    server: { host: "0.0.0.0", port: Number(process.env.FRONTEND_ARTICLE_APP_PORT) },
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    dev: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
