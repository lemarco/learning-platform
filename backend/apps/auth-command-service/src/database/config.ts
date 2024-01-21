import { resolve } from "path";
import type { Config } from "drizzle-kit";

const schemaPath = resolve("./backend/libs/schemas/src/auth-events.ts");

export default {
  schema: schemaPath,
  out: "./backend/apps/auth-command-service/src/database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.AUTH_EVENTS_DB_URL || "",
  },
} satisfies Config;
