import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";
import { defineConfig } from "vite";

import { replaceCodePlugin } from "vite-plugin-replace";
const { parsed, error } = config();
if (error) {
  process.exit();
}
export default defineConfig({
  plugins: [
    replaceCodePlugin({
      replacements: [
        {
          from: /__DEV__/g,
          to: "true",
        },
      ],
    }),

    react(),
  ],

  base: "/editor",
  server: {
    port: 10008,
    host: true,
  },
  build: {
    outDir: "build",

    minify: "terser",
  },
});
