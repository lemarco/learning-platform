/** @type {import('tailwindcss').Config} */

import { config } from "../../tailwind.config.base";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", ...config.content],
  theme: config.theme,
};
