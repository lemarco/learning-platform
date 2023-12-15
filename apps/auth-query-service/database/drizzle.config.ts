import type { Config } from 'drizzle-kit';
import { resolve } from 'path';
export default {
  schema: './schema/*',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.AUTH_READ_DB_URL || '',
  },
} satisfies Config;
