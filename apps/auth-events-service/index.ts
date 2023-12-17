import { EachMessagePayload } from 'kafkajs';
import {
  migrator,
  Event,
  KafkaConsumer,
  createEnvStore,
  KafkaProducer,
  Redis,
  Logger,
  logger,
  NotAuthorizedResponse,
  BadRequest,
} from 'framework';
import { resolve } from 'path';

// import { oauth2ClientGoogle } from './google-client';
import z from 'zod';

import { randomUUID } from 'crypto';
import { Elysia, t } from 'elysia';
import { DURATION_UNITS } from 'utils/datetime';
import { Pool } from 'pg';

import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from 'schemas';
import { eq } from 'drizzle-orm';
// import { users } from './database/schema';
// const migrationsFolder = resolve('./migrations');
// await migrator(process.env.AUTH_READ_DB_URL || '', migrationsFolder);

const handleMessage = async ({
  message,
}: EachMessagePayload): Promise<void> => {
  if (message.value) {
    const messageParsed = JSON.parse(
      message.value?.toString()
    ) as Event<unknown>;
  }
};

const bootstrap = async () => {
  const env = createEnvStore(
    z.object({
      AUTH_TOKEN_STORE_PORT: z.string().transform((val) => +val),
      AUTH_TOKEN_STORE_HOST: z.string(),

      INTERNAL_COMUNICATION_SECRET: z.string(),
    })
  );
  const usersdb = drizzle(
    new Pool({
      connectionString: process.env.AUTH_EVENTS_DB_URL,
    }),
    { schema: { ...users } }
  );
  const redis = new Redis({
    host: env.AUTH_TOKEN_STORE_HOST,
    port: +env.AUTH_TOKEN_STORE_PORT,
    logger,
  });
  const consumer = new KafkaConsumer();
  console.log('KAFKA CONSUMER');
  await consumer.connect();
  await consumer.subscribe('', handleMessage);
};
await bootstrap();
