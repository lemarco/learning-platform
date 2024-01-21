import { resolve } from "path";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Elysia, ListenCallback, TSchema, TraceHandler } from "elysia";
import { KafkaProducer, Logger, Redis, createEnvStore, migrator } from "framework";
import { Pool } from "pg";
import { users } from "schemas";
import z from "zod";
import { GoogleHandlerGroup } from "./google";
import { VerifyGroupHandler } from "./verify";

const logger = Logger("Auth-query-service");
const migrationsUsersFolder = resolve("./apps/auth-query-service/database/migrations");
const env = createEnvStore(
  z.object({
    AUTH_EVENTS_DB_URL: z.string(),
    AUTH_READ_DB_URL: z.string(),
    AUTH_QUERY_SERVICE_PORT: z.string().transform((val) => +val),
    AUTH_QUERY_SERVICE_HOST_NAME: z.string(),
    JWT_SECRET: z.string(),
    AUTH_TOKEN_STORE_HOST_NAME: z.string(),
    AUTH_TOKEN_STORE_PORT: z.string().transform((val) => +val),
    OAUTH_REDIRECT_URL: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    INTERNAL_COMUNICATION_SECRET: z.string(),
  }),
  logger,
);

await migrator(env.AUTH_READ_DB_URL || "", migrationsUsersFolder, logger);
const redis = new Redis({ host: env.AUTH_TOKEN_STORE_HOST_NAME, port: +env.AUTH_TOKEN_STORE_PORT, logger });

const userDb: NodePgDatabase<TSchema> = drizzle(new Pool({ connectionString: env.AUTH_READ_DB_URL }), { schema: { ...users } });

const onStart: ListenCallback = () => logger.info(`Auth query service started on port ${env.AUTH_QUERY_SERVICE_PORT}`);
const tracer: TraceHandler = (req) => logger.info(req);

const app = new Elysia()
  .get("/", () => new Response("OK"))
  .decorate("env", env)
  .decorate("logger", logger)
  .decorate("redis", redis)
  .decorate("usersDb", userDb)
  .decorate("eventProducer", new KafkaProducer())
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
