import type { Config } from 'drizzle-kit';

export default {
  schema: './events.schema/*',
  out: '../drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.AUTH_EVENTS_DB_URL || '',
  },
} satisfies Config;
