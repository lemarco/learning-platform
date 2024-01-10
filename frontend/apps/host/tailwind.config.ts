import { join } from "node:path";
import type { Config } from "tailwindcss";
const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");

import flowbite from "flowbite/plugin";

import colors from "tailwindcss/colors";

export default {
  content: [
    join(__dirname, "src/**/*!(*.stories|*.spec).{ts,tsx,html}"),
    "/app/apps/host/src/**/*!(*.stories|*.spec).{ts,tsx,html}",
    ...createGlobPatternsForDependencies(__dirname),
    join(__dirname, "node_modules/flowbite-react/lib/**/*.{js,ts}"),
  ],
  darkMode: "media",

  theme: {
    extend: {
      colors: {
        primary: colors.blue,
      },
      fontFamily: {
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      maxWidth: {
        "2xs": "16rem",
        "8xl": "90rem",
      },
    },
  },

  plugins: [flowbite],
} satisfies Config;
