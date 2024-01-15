/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

import flowbite from "flowbite/plugin";

export default {
  plugins: [flowbite],
  content: [
    "/app/apps/header/src/**/*.{js,ts,jsx,tsx,mdx}",
    "/app/libs/modal/src/**/*.{js,ts,jsx,tsx,mdx}",

    "/app/apps/header/node_modules/flowbite/**/*.{js,ts}",
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
};
