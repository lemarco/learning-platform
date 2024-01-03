import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { Logger } from "pino";
import postgres from "postgres";

type DBCredentials = {
  user: string;
  database: string;
  host: string;
  password: string;
};
export const migrator = async (creds: DBCredentials | string, migrationsFolder: string, logger: Logger<never>) => {
  logger.info("***MIGRATION STARTED***", creds);

  const migrationClient = postgres(creds as unknown as string, {
    max: 1,
  });
  try {
    await migrate(drizzle(migrationClient), { migrationsFolder });
  } catch (e) {

    throw e;
  }
  logger.info("***MIGRATION ENDED***");
};
