import type { Config } from 'drizzle-kit';
import { resolve } from 'path';

const schemaPath = resolve('./libs/schemas/auth-events.ts');

export default {
  schema: schemaPath,
  out: './apps/auth-command-service/database/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.AUTH_READ_DB_URL || '',
  },
} satisfies Config;
