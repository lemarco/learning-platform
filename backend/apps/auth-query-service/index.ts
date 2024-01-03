import { resolve } from "path";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Elysia, ListenCallback, TSchema, TraceHandler } from "elysia";
import { KafkaProducer, Redis, createEnvStore, Logger, migrator } from "framework";
import { Pool } from "pg";
import z from "zod";
import { users } from "schemas";
import { VerifyGroupHandler } from "./verify";
import { GoogleHandlerGroup } from "./google";

const logger = Logger("Auth-query-service");

const migrationsUsersFolder = resolve("./apps/auth-query-service/database/migrations");
await migrator(process.env.AUTH_READ_DB_URL || "", migrationsUsersFolder, logger);
const env = createEnvStore(
  z.object({
    AUTH_QUERY_SERVICE_PORT: z.string().transform((val) => +val),
    AUTH_QUERY_SERVICE_HOST: z.string(),
    JWT_SECRET: z.string(),
    AUTH_TOKEN_STORE_HOST: z.string(),
    AUTH_TOKEN_STORE_PORT: z.string().transform((val) => +val),
    OAUTH_REDIRECT_URL: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    INTERNAL_COMUNICATION_SECRET: z.string(),
  }),
);
const userDb: NodePgDatabase<TSchema> = drizzle(
  new Pool({
    connectionString: process.env.AUTH_EVENTS_DB_URL,
  }),
  { schema: { ...users } },
);
const redis = new Redis({
  host: env.AUTH_TOKEN_STORE_HOST,
  port: +env.AUTH_TOKEN_STORE_PORT,
  logger,
});
const onStart: ListenCallback = () => logger.info(`Auth query service started on port ${env.AUTH_QUERY_SERVICE_PORT}`);
const tracer: TraceHandler = (req) => logger.info(req);
const app = new Elysia()
  .get("/", () => new Response("OK"))
  .state("env", env)
  .state("logger", logger)
  .state("redis", redis)
  .state("usersDb", userDb)
  .state("eventProducer", new KafkaProducer())
  .derive(({ headers }) => ({
    access: headers.access_token || "",
    refresh: headers.refresh_token || "",
  }))
  .trace(tracer);

const ListenConfig = {
  hostname: "0.0.0.0",
  port: env.AUTH_QUERY_SERVICE_PORT,
};

app.group("/auth", (app) => app.use(VerifyGroupHandler).use(GoogleHandlerGroup)).listen(ListenConfig, onStart);
export type App = typeof app;
