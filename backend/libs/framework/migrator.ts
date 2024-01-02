import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { logger } from "./logger";

type DBCredentials = {
  user: string;
  database: string;
  host: string;
  password: string;
};
export const migrator = async (creds: DBCredentials | string, migrationsFolder: string) => {
  logger.debug("***MIGRATION STARTED***", creds);

  const migrationClient = postgres(creds as unknown as string, {
    max: 1,
  });
  await migrate(drizzle(migrationClient), { migrationsFolder });
  logger.debug("***MIGRATION ENDED***");
};
