import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { config } from "dotenv";
import { type UserConfig, defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const { parsed, error } = config();
console.log("Number(parsed?.PUBLIC_FRONTEND_INFO_PORT) = ", Number(parsed?.PUBLIC_FRONTEND_INFO_PORT));
if (error) {
  process.exit();
}
export default defineConfig((): UserConfig => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
      host: "0.0.0.0",
      port: Number(parsed?.PUBLIC_FRONTEND_INFO_PORT),
      // fs: {
      //   // Allow serving files from the project root
      //   allow: ["../../"],
      // },
    },

    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
