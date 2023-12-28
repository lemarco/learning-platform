import { resolve } from "path";
import type { Config } from "drizzle-kit";

const schemaPath = resolve("./libs/schemas/auth-users.ts");

export default ({
  schema: schemaPath,
  out: "./apps/auth-query-service/database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.AUTH_READ_DB_URL || "",
  },
} satisfies Config);
