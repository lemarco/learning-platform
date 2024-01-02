import { resolve } from "path";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Elysia, ListenCallback, TSchema, } from "elysia";
import { KafkaProducer, NotAuthorizedResponse, Redis, createEnvStore, logger } from "framework";
import { migrator } from "framework";
import { verify } from "jsonwebtoken";
import { Pool } from "pg";
import { events } from "schemas";
import z from "zod";

import { googleGroupHandler } from "./google";

const migrationsEventsFolder = resolve("./apps/auth-command-service/database/migrations");
await migrator(process.env.AUTH_EVENTS_DB_URL || "", migrationsEventsFolder);
const env = createEnvStore(
  z.object({
    JWT_SECRET: z.string(),

    AUTH_COMMANDS_SERVICE_PORT: z.string(),
    AUTH_COMMANDS_SERVICE_HOST: z.string(),

    AUTH_TOKEN_STORE_HOST: z.string(),
    AUTH_TOKEN_STORE_PORT: z.string(),

    OAUTH_REDIRECT_URL: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    INTERNAL_COMUNICATION_SECRET: z.string(),
  }),
);

const pool: NodePgDatabase<TSchema> = drizzle(
  new Pool({
    connectionString: process.env.AUTH_EVENTS_DB_URL,
  }),
  { schema: { ...events } },
)
const redis = new Redis({
  host: env.AUTH_TOKEN_STORE_HOST,
  port: +env.AUTH_TOKEN_STORE_PORT,
  logger,
})

const app = new Elysia().group("/auth", (app) => app
  .state("env", env)
  .state("logger", logger)
  .state("redis", redis)
  .state("eventsDb", pool)
  .state("eventProducer", new KafkaProducer())
  .derive(({ cookie }) => ({
    access: cookie.access_token.get(),
    refresh: cookie.refresh_token.get(),
  }))
)

export type App = typeof app
const ListenConfig = {
  port: env.AUTH_COMMANDS_SERVICE_PORT,
  hostname: '0.0.0.0',
}
const onStart: ListenCallback = () => logger.info(`Auth command service started on port ${env.AUTH_COMMANDS_SERVICE_PORT}`)
app.derive(({ cookie }) => ({
  access: cookie.access_token.get(),
  refresh: cookie.refresh_token.get(),
})).use(googleGroupHandler)
  .get(
    "/logout",
    async ({ access, refresh, store: { redis, env } }) => {
      const { id } = verify(access, env.JWT_SECRET) as { id: string };
      await redis.setWithExpiry("access-block", id, refresh, 15);
      return new Response("", {
        status: 200,
        headers: {
          "Set-Cookie": "access=; Max-Age=0;HttpOnly;,refresh=; Max-Age=0;HttpOnly;",
        },
      });
    },
    {
      error: async (e) => NotAuthorizedResponse(),
      beforeHandle: ({ access, refresh }) => {
        if (!access || !refresh) {
          return NotAuthorizedResponse();
        }
      },
    },
  ).listen(ListenConfig, onStart);