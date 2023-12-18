import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
const config = dotenv.parse(readFileSync('../../.env'));
console.log('config = ', config);
export default defineConfig({
  plugins: [react()],
  server: {
    port: +config.PLATFORM_APP_FRONTEND_PORT,
    // host: config.INNER_DOCKER_HOST,
  },
});
