import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { config } from "dotenv";

const { parsed, error } = config();
if (error) {
  process.exit();
}
export default defineConfig((): UserConfig => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    server: {
      host: "0.0.0.0",
      port: Number(parsed?.PUBLIC_FRONTEND_EDITOR_PORT),
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
