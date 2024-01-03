import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { qwikNxVite } from 'qwik-nx/plugins';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/libs/modal',
  plugins: [qwikNxVite(), qwikVite(), tsconfigPaths({ root: '../../' })],

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reportsDirectory: '../../coverage/libs/modal',
    },
  },
});
