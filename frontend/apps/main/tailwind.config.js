/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/flowbite/**/*.js"],

  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // add this line
  ],
};
