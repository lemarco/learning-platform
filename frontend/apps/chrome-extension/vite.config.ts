import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    // rollupOptions: {
    //   input: {
    //     main: new URL('./index.html', import.meta.url).pathname,

    //   },
    // },
    // commonjsOptions: {include: []},
    minify: "terser",
    // terserOptions: {
    //   compress: {
    //     toplevel: true,
    //   }
    // },
  },
});
