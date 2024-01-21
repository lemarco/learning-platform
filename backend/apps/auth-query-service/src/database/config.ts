import { resolve } from "path";
import type { Config } from "drizzle-kit";

const schemaPath = resolve("./backend/libs/schemas/src/auth-users.ts");
const connectionString = process.env.AUTH_READ_DB_URL as string;

export default {
  schema: schemaPath,
  out: "./backend/apps/auth-query-service/src/database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
} satisfies Config;
