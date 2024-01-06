import { join } from "node:path";

const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");

export default {
  content: [
    join(__dirname, "src/**/*!(*.stories|*.spec).{ts,tsx,html}"),
    join(__dirname, "./index.html"),
    ...createGlobPatternsForDependencies(__dirname),
    join(__dirname, "node_modules/flowbite-react/lib/**/*.{js,ts}"),
    "/app/apps/blog-admin/src/**/*!(*.stories|*.spec).{ts,tsx,html}",
    "/app/apps/blog-admin/index.html",
    "/app/node_modules/flowbite-react/lib/**/*.{js,ts}",
  ],
  darkMode: "media",
  theme: {
    colors: {
      primary: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
    },
    fontFamily: {
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
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/typography")],
};