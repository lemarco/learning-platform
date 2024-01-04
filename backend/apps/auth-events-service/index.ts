import { drizzle } from "drizzle-orm/node-postgres";
import { Event, KafkaConsumer, Logger, Redis, createEnvStore } from "framework";
import { EachMessagePayload } from "kafkajs";
import { Pool } from "pg";
import { users } from "schemas";
import z from "zod";
// import { users } from './database/schema';
// const migrationsFolder = resolve('./migrations');
// await migrator(process.env.AUTH_READ_DB_URL || '', migrationsFolder);

const handleMessage = async ({ message }: EachMessagePayload): Promise<void> => {
  if (message.value) {
    const messageParsed = JSON.parse(message.value?.toString()) as Event<unknown>;
  }
};
const logger = Logger("auth-events-service");
const env = createEnvStore(
  z.object({
    AUTH_TOKEN_STORE_PORT: z.string().transform((val) => +val),
    AUTH_TOKEN_STORE_HOST: z.string(),
    INTERNAL_COMUNICATION_SECRET: z.string(),
  }),
  logger,
);

const bootstrap = async () => {
  const usersdb = drizzle(
    new Pool({
      connectionString: env.AUTH_EVENTS_DB_URL,
    }),
    { schema: { ...users } },
  );
  const redis = new Redis({
    host: env.AUTH_TOKEN_STORE_HOST,
    port: +env.AUTH_TOKEN_STORE_PORT,
    logger,
  });
  const consumer = new KafkaConsumer();

  await consumer.connect();
  await consumer.subscribe("", handleMessage);
};
await bootstrap();
