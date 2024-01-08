import { resolve } from "path";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Elysia, type ListenCallback, type TraceHandler, type TSchema } from "elysia";
import { KafkaProducer, KafkaConsumer, Logger, Redis, createEnvStore, migrator } from "framework";
import { Pool } from "pg";
import { articlesEvents } from "schemas";
import z from "zod";
import { randomUUID } from "crypto";

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

await migrator(env.ARTICLE_EVENTS_DB_URL || "", migrationsUsersFolder, logger);
const articlesdb: NodePgDatabase<TSchema> = drizzle(new Pool({ connectionString: env.ARTICLE_EVENTS_DB_URL }), {
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
