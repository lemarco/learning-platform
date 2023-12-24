import { resolve } from "path";
import type { Config } from "drizzle-kit";

const schemaPath = resolve("./src/server-libs/schemas/auth-events.ts");

export default ({
  schema: schemaPath,
  out: "./src/server-apps/auth-command-service/database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.AUTH_EVENTS_DB_URL || "",
  },
} satisfies Config);
