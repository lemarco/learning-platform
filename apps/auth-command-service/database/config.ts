import { resolve } from "path";
import type { Config } from "drizzle-kit";

const schemaPath = resolve("./libs/schemas/auth-events.ts");

export default ({
  schema: schemaPath,
  out: "./apps/auth-command-service/database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.AUTH_EVENTS_DB_URL || "",
  },
} satisfies Config);
