import { resolve } from "path";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Elysia, type ListenCallback, type TraceHandler, type TSchema } from "elysia";
import { KafkaProducer, Logger, Redis, createEnvStore, migrator } from "framework";
import { Pool } from "pg";
import { users } from "schemas";
import z from "zod";
import { ArticleGroupHandler } from "./articles";

const logger = Logger("Articles-query-service");
const migrationsUsersFolder = resolve("./apps/articles-query-service/database/migrations");

const env = createEnvStore(
  z.object({
    ARTICLE_READ_DB_URL: z.string(),
    ARTICLES_QUERY_SERVICE_HOST_NAME: z.string(),
    ARTICLES_QUERY_SERVICE_PORT: z.string().transform((val) => +val),
  }),
  logger,
);

await migrator(env.ARTICLE_READ_DB_URL || "", migrationsUsersFolder, logger);
const articlesdb: NodePgDatabase<TSchema> = drizzle(new Pool({ connectionString: env.ARTICLE_READ_DB_URL }), { schema: { ...users } });
const onStart: ListenCallback = () => logger.info(`Article query service started on port ${env.ARTICLES_QUERY_SERVICE_PORT}`);
const tracer: TraceHandler = (req) => logger.info(req);

const app = new Elysia()
  .get("/", () => new Response("OK"))
  .decorate("env", env)
  .decorate("logger", logger)
  .decorate("articlesdb", articlesdb)
  .trace(tracer);

const ListenConfig = {
  hostname: "0.0.0.0",
  port: env.ARTICLES_QUERY_SERVICE_PORT,
};

app.group("/articles", (app) => app.use(ArticleGroupHandler).listen(ListenConfig, onStart));
export type App = typeof app;
