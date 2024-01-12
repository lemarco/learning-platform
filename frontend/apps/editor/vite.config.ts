import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikReact } from '@builder.io/qwik-react/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikNxVite } from 'qwik-nx/plugins';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';


import { config } from "dotenv";

const { parsed, error } = config();
console.log("Number(parsed?.PUBLIC_FRONTEND_EDITOR_PORT) = ", Number(parsed?.PUBLIC_FRONTEND_EDITOR_PORT));
if (error) {
  process.exit();
}
export default defineConfig({
  cacheDir: '../../node_modules/.vite/apps/editor',
  plugins: [
    qwikNxVite(),
    qwikCity(),
    qwikVite({
      // client: {
      //   outDir: '../../dist/apps/editor/client',
      // },
      // ssr: {
      //   outDir: '../../dist/apps/editor/server',
      // },
      csr: true,
      tsconfigFileNames: ['tsconfig.app.json'],
    }),
    tsconfigPaths({ root: '../../' }),
   
    qwikReact()
  ],
  server: {
    host: "0.0.0.0",
    port: Number(parsed?.PUBLIC_FRONTEND_EDITOR_PORT),
    fs: {
      // Allow serving files from the project root
      allow: ['../../'],
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=600',
    },
  },
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
