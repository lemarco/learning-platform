import { resolve } from "path";
import type { Config } from "drizzle-kit";

const schemaPath = resolve("./backend/libs/schemas/src/articles-events.ts");
const connectionString = process.env.ARTICLE_EVENTS_DB_URL as string;

export default {
  schema: schemaPath,
  out: "./backend/apps/articles-command-service/src/database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
} satisfies Config;
