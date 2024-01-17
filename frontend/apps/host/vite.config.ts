import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { config } from "dotenv";
import { type UserConfig, defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// import { buildSync } from "esbuild";
// import { join } from "path";
// import webWorkerLoader from "rollup-plugin-web-worker-loader";
const { parsed, error } = config();

if (error) {
  process.exit();
}
export default defineConfig((): UserConfig => {
  return {
    // resolve: {
    //   alias: {
    //     process: "process/browser",
    //     stream: "stream-browserify",
    //     zlib: "browserify-zlib",
    //     util: "util",
    //   },
    // },
    // optimizeDeps: {
    //   include: ["./src/routes/worker.js"],
    // },
    // worker: {},
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      // webWorkerLoader(
      //   /* configuration */ {
      //     loadPath: "./worker.js",
      //   },
      // ),
      // {
      //   apply: "build",
      //   enforce: "post",
      //   transformIndexHtml() {
      //     buildSync({
      //       minify: true,
      //       bundle: true,
      //       entryPoints: [join(process.cwd(), "src", "routes", "worker.js")],
      //       outfile: join(process.cwd(), "dist", "worker.js"),
      //     });
      //   },
      // },
    ],
    server: {
      host: "0.0.0.0",
      port: Number(parsed?.PUBLIC_FRONTEND_HOST_APP_PORT),
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
