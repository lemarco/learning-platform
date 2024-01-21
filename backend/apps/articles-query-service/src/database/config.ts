import { resolve } from "path";
import type { Config } from "drizzle-kit";

const schemaPath = resolve("./libs/schemas/articles.ts");
const connectionString = process.env.ARTICLE_READ_DB_URL as string;

export default {
  schema: schemaPath,
  out: "./apps/articles-query-service/database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
} satisfies Config;
