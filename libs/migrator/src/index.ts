import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
const migrationsFolder = 'apps/gateway/drizzle';

export const migrator = async (creds: {
  user: string;
  database: string;
  host: string;
  password: string;
}) => {
  console.log('***MIGRATION STARTED***');
  const migrationClient = postgres(creds as unknown as string, { max: 1 });
  await migrate(drizzle(migrationClient), { migrationsFolder });
  console.log('***MIGRATION ENDED***');
};
