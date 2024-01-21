import { resolve } from "path";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Elysia, ListenCallback, TSchema } from "elysia";
import { migrator, KafkaProducer, Logger, Redis, createEnvStore } from "framework";

import { Pool } from "pg";
import { events } from "schemas";
import z from "zod";

import { GoogleLoginGroupHandler } from "./google";
import { LogoutGroupHandler } from "./logout";
const logger = Logger("Auth-command-service");
const migrationsEventsFolder = resolve("./apps/auth-command-service/database/migrations");
const env = createEnvStore(
  z.object({
    JWT_SECRET: z.string(),
    AUTH_COMMANDS_SERVICE_PORT: z.string(),
    AUTH_COMMANDS_SERVICE_HOST_NAME: z.string(),
    AUTH_TOKEN_STORE_HOST_NAME: z.string(),
    AUTH_TOKEN_STORE_PORT: z.string(),
    OAUTH_REDIRECT_URL: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    INTERNAL_COMUNICATION_SECRET: z.string(),
  }),
  logger,
);
await migrator(env.AUTH_EVENTS_DB_URL || "", migrationsEventsFolder, logger);

const pool: NodePgDatabase<TSchema> = drizzle(
  new Pool({
    connectionString: env.AUTH_EVENTS_DB_URL,
  }),
  { schema: { ...events } },
);
const redis = new Redis({
  host: env.AUTH_TOKEN_STORE_HOST_NAME,
  port: +env.AUTH_TOKEN_STORE_PORT,
  logger,
});

const app = new Elysia()
  .get("/", () => new Response("OK"))
  .decorate("env", env)
  .decorate("logger", logger)
  .decorate("redis", redis)
  .decorate("eventsDb", pool)
  .decorate("eventProducer", new KafkaProducer())
  .derive(({ cookie }) => ({
    access: cookie.access_token.get(),
    refresh: cookie.refresh_token.get(),
  }));

export type App = typeof app;
const ListenConfig = {
  port: env.AUTH_COMMANDS_SERVICE_PORT,
  hostname: "0.0.0.0",
};
const onStart: ListenCallback = () => logger.info(`Started on port ${env.AUTH_COMMANDS_SERVICE_PORT}`);
app.group("/auth", (app) => app.use(GoogleLoginGroupHandler).use(LogoutGroupHandler)).listen(ListenConfig, onStart);
