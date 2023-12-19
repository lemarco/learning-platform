import { readFileSync } from "fs";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import { defineConfig } from "vite";
const config = dotenv.parse(readFileSync("../../.env"));
console.log("PLATFORM_APP_FRONTEND_PORT = ", config.PLATFORM_APP_FRONTEND_PORT);
export default defineConfig({
  plugins: [react()],
  server: {
    port: +config.PLATFORM_APP_FRONTEND_PORT,
    host: "0.0.0.0",
    // host: config.INNER_DOCKER_HOST,
  },
});
