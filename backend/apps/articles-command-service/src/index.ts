import { randomUUID } from "crypto";
import { resolve } from "path";
import { type NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Elysia, type ListenCallback, type TSchema, type TraceHandler } from "elysia";
import { KafkaConsumer, KafkaProducer, Logger, Redis, createEnvStore, migrator } from "framework";
import { Pool } from "pg";
import { articlesEvents } from "schemas";
import z from "zod";

const logger = Logger("Articles-command-service");
const migrationsUsersFolder = resolve("./apps/articles-command-service/database/migrations");

const env = createEnvStore(
  z.object({
    ARTICLE_EVENTS_DB_URL: z.string(),
    ARTICLES_COMMAND_SERVICE_HOST_NAME: z.string(),
    ARTICLES_COMMAND_SERVICE_PORT: z.string().transform((val) => +val),
  }),
  logger,
);

await migrator(env.ARTICLES_EVENTS_DB_URL || "", migrationsUsersFolder, logger);
const articlesdb: NodePgDatabase<TSchema> = drizzle(new Pool({ connectionString: env.ARTICLES_EVENTS_DB_URL }), {
  schema: { ...articlesEvents },
});
const onStart: ListenCallback = () => logger.info(`Article command service started on port ${env.ARTICLES_COMMAND_SERVICE_PORT}`);
const tracer: TraceHandler = (req) => logger.info(req);
const ListenConfig = {
  hostname: "0.0.0.0",
  port: env.ARTICLES_COMMAND_SERVICE_PORT,
};
const consumer = new KafkaConsumer();

consumer.subscribe("ARTICLE_CREATED", async (event) => {
  await articlesdb.insert(articlesEvents).values({ id: randomUUID(), version: 1, name: "ARTICLE_CREATED", payload: event });
});
consumer.subscribe("ARTICLE_CONTENT_UPDATED", async (event) => {
  await articlesdb.insert(articlesEvents).values({ id: randomUUID(), version: 1, name: "ARTICLE_CONTENT_UPDATED", payload: event });
});
consumer.subscribe("ARTICLE_TITLE_UPDATED", async (event) => {
  await articlesdb.insert(articlesEvents).values({ id: randomUUID(), version: 1, name: "ARTICLE_TITLE_UPDATED", payload: event });
});
consumer.subscribe("ARTICLE_TAGS_UPDATED", async (event) => {
  await articlesdb.insert(articlesEvents).values({ id: randomUUID(), version: 1, name: "ARTICLE_TAGS_UPDATED", payload: event });
});
const app = new Elysia()
  .get("/", () => new Response("OK"))
  .listen(ListenConfig, onStart)
  .trace(tracer);
