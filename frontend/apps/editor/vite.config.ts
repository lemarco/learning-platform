import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";
import { defineConfig } from "vite";

import babel from "@rollup/plugin-babel";
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
    ,
    // babel({
    //   babelHelpers: 'bundled',
    //   babelrc: false,
    //   configFile: false,
    //   exclude: '/**/node_modules/**',
    //   extensions: ['jsx', 'js', 'ts', 'tsx', 'mjs'],
    //   plugins: ['@babel/plugin-transform-flow-strip-types'],
    //   presets: ['@babel/preset-react'],
    // })

    react(),
  ],
  // build: {
  //   manifest: true
  // },
  base: "/editor",
  server: {
    port: 10008,
    host: true,
  },
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
