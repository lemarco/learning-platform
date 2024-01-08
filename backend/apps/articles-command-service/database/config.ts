import { resolve } from "path";
import type { Config } from "drizzle-kit";

const schemaPath = resolve("./libs/schemas/articles-events.ts");
const connectionString = process.env.ARTICLE_EVENTS_DB_URL as string;

export default ({
  schema: schemaPath,
  out: "./apps/auth-events/database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
} satisfies Config);
