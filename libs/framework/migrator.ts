import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { logger } from './logger';
import postgres from 'postgres';

type DBCredentials = {
  user: string;
  database: string;
  host: string;
  password: string;
};
export const migrator = async (
  creds: DBCredentials,
  migrationsFolder: string
) => {
  logger.debug('***MIGRATION STARTED***', creds);

  const migrationClient = postgres(creds as unknown as string, {
    max: 1,
  });
  await migrate(drizzle(migrationClient), { migrationsFolder });
  logger.debug('***MIGRATION ENDED***');
};
