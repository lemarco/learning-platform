import { cron } from "@elysiajs/cron";
import { type NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Elysia, type ListenCallback, type TSchema, type TraceHandler } from "elysia";
import { Logger, createEnvStore } from "framework";
import { Pool } from "pg";
import { articles, articlesEvents } from "schemas";
import z from "zod";
const logger = Logger("Articles-query-service");

const env = createEnvStore(
  z.object({
    ARTICLES_READ_DB_URL: z.string(),
    ARTICLES_EVENTS_DB_URL: z.string(),
    ARTICLES_SYNC_SERVICE_HOST_NAME: z.string(),
    ARTICLES_SYNC_SERVICE_PORT: z.string().transform((val) => +val),
  }),
  logger,
);
const ListenConfig = {
  hostname: "0.0.0.0",
  port: env.ARTICLES_SYNC_SERVICE_PORT,
};
const articleReadDb: NodePgDatabase<TSchema> = drizzle(new Pool({ connectionString: env.ARTICLES_READ_DB_URL }), {
  schema: { ...articles },
});
const articleEventsDb: NodePgDatabase<TSchema> = drizzle(new Pool({ connectionString: env.ARTICLES_EVENTS_DB_URL }), {
  schema: { ...articlesEvents },
});
const onStart: ListenCallback = () => logger.info(`Article query service started on port ${env.ARTICLES_SYNC_SERVICE_PORT}`);
const tracer: TraceHandler = (req) => logger.info(req);

const app = new Elysia()
  .get("/", () => new Response("OK"))
  .use(
    cron({
      name: "heartbeat",
      pattern: "* */10 * * * *",
      run() {
        logger.info({}, "Sync start");
        // TODO:
        // Read last record from read db
        // Find by id in events db
        // If there is after this event
        // Get and push ro read db
        logger.info({}, "Sync end");
      },
    }),
  )
  .trace(tracer)
  .listen(ListenConfig);
