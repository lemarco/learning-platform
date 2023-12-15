import { verify } from 'jsonwebtoken';
import { gooogleSignin } from './handlers/signin';
import z from 'zod';
import { Elysia, t } from 'elysia';
import {
  getEnv,
  createEnvStore,
  KafkaProducer,
  Redis,
  Logger,
  logger,
  NotAuthorizedResponse,
  BadRequest,
} from 'framework';
import { migrator } from 'framework';
import { resolve } from 'path';
import { Pool } from 'pg';

import { events } from './database/schema';
import { drizzle } from 'drizzle-orm/node-postgres';

const migrationsEventsFolder = resolve('./database/events-migrations');
await migrator(process.env.AUTH_EVENTS_DB_URL || '', migrationsEventsFolder);

const secret = getEnv<string>('JWT_SECRET');
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
  })
);
const redis = new Redis({
  host: getEnv('AUTH_TOKEN_STORE_HOST'),
  port: getEnv<number>('AUTH_TOKEN_STORE_PORT'),
  logger,
});
const eventProducer = new KafkaProducer();
const app = new Elysia()
  .state('env', env)
  .state('logger', logger)
  .state('redis', redis)

  .state(
    'eventsDb',
    drizzle(
      new Pool({
        connectionString: process.env.AUTH_EVENTS_DB_URL,
      }),
      { schema: { ...events } }
    )
  )
  .state('eventProducer', eventProducer)

  .derive(({ cookie }) => ({
    access: cookie['access_token'].get(),
    refresh: cookie['refresh_token'].get(),
  }))
  .group('/auth', (app) =>
    app
      .group('/google', (app) =>
        app
          .derive(({ request, query, headers, store }) => {
            const code = String(query['code']);
            const userAgent = headers['user-agent'] || '';
            const clientIP = app.server?.requestIP(request)?.address || '';
            return {
              code,
              userAgent,
              ip: clientIP,
              eventProducer: store.eventProducer,
              redis: store.redis,
              env: store.env,
            };
          })
          .get('/signin', gooogleSignin, {
            beforeHandle: ({ query }) => {
              const code = query['code'];
              if (!code) {
                return BadRequest();
              }
            },
          })
      )
      .derive(({ cookie }) => ({
        access: cookie['access_token'].get(),
        refresh: cookie['refresh_token'].get(),
      }))
      .get(
        '/logout',
        async ({ access, refresh, store: { redis } }) => {
          const { id } = verify(access, secret) as { id: string };
          await redis.setWithExpiry('access-block', id, refresh, 15);
          return new Response('', {
            status: 200,
            headers: {
              'Set-Cookie':
                'access=; Max-Age=0;HttpOnly;,refresh=; Max-Age=0;HttpOnly;',
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
        }
      )
      .listen({
        port: getEnv<number>('AUTH_QUERY_SERVICE_PORT'),
        hostname: getEnv('AUTH_QUERY_SERVICE_HOST'),
      })
  );
