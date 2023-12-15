import { sign, verify } from 'jsonwebtoken';
import { oauth2ClientGoogle } from './google-client';
import z from 'zod';
import {
  createEnvStore,
  KafkaProducer,
  Redis,
  Logger,
  logger,
  NotAuthorizedResponse,
  migrator,
  BadRequest,
} from 'framework';
import { randomUUID } from 'crypto';
import { Elysia, t } from 'elysia';
import { DURATION_UNITS } from 'utils/datetime';
import { Pool } from 'pg';
import { resolve } from 'path';
import { drizzle } from 'drizzle-orm/node-postgres';

import { eq } from 'drizzle-orm';
import { users } from 'schemas';

const migrationsUsersFolder = resolve(
  './apps/auth-query-service/database/migrations'
);
await migrator(process.env.AUTH_READ_DB_URL || '', migrationsUsersFolder);
const linkProperties = {
  access_type: 'offline',
  prompt: 'consent',
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
};
type Store = {
  redis: Redis;
  eventProducer: KafkaProducer;
  env: Record<string, string>;
  logger: Logger;
};
const tokenExpireFlow = async ({
  error,
  refresh,
  store: { eventProducer, env, redis },
}: {
  store: Store;
  refresh: string;
  error: any;
}) => {
  if (error.name !== 'TokenExpiredError') {
    return NotAuthorizedResponse();
  }
  const token = await redis.get('refresh', refresh);
  if (!token) {
    // Expired refresh. User has to login again
    return NotAuthorizedResponse();
  }
  const { payload } = verify(token, env.JWT_SECRET) as any;
  // issue new token pair
  const { id, role } = payload;
  const newRefresh = sign({ id, role }, env.JWT_SECRET, {
    expiresIn: '7d',
  });
  const newAccess = sign({ id, role }, env.JWT_SECRET, {
    expiresIn: '15m',
  });
  await redis.setWithExpiry('refresh', id, refresh, DURATION_UNITS.w);
  const event = {
    id: randomUUID(),
    name: 'TokenPairIssued',
    version: 1,
    causationId: '',
    timestamp: new Date().toISOString(),
    data: {
      refresh: newRefresh,
      access: newAccess,
    },
  };
  eventProducer.produceMessage('AUTH_EVENTS_TOPIC', JSON.stringify(event));
  return Response.json({
    id,
    role,
    tokens: { access: newAccess, refresh: newRefresh },
  });
};

const app = new Elysia().group('/auth', (app) => {
  const env = createEnvStore(
    z.object({
      AUTH_QUERY_SERVICE_PORT: z.string().transform((val) => +val),
      AUTH_QUERY_SERVICE_HOST: z.string(),
      JWT_SECRET: z.string(),
      AUTH_TOKEN_STORE_HOST: z.string(),
      AUTH_TOKEN_STORE_PORT: z.string().transform((val) => +val),
      OAUTH_REDIRECT_URL: z.string(),
      GOOGLE_CLIENT_SECRET: z.string(),
      GOOGLE_CLIENT_ID: z.string(),
      INTERNAL_COMUNICATION_SECRET: z.string(),
    })
  );
  return app
    .state('env', env)
    .state('logger', logger)
    .state(
      'redis',
      new Redis({
        host: env.AUTH_TOKEN_STORE_HOST,
        port: +env.AUTH_TOKEN_STORE_PORT,
        logger,
      })
    )
    .state(
      'usersDb',
      drizzle(
        new Pool({
          connectionString: process.env.AUTH_EVENTS_DB_URL,
        }),
        { schema: { ...users } }
      )
    )
    .state('eventProducer', new KafkaProducer())
    .derive(({ cookie }) => ({
      access: cookie['access_token'].get(),
      refresh: cookie['refresh_token'].get(),
    }))
    .group('/google', (app) =>
      app
        .get(
          '/link',
          async () => ({
            link: await oauth2ClientGoogle.generateAuthUrl(linkProperties),
          }),
          {
            error: () => NotAuthorizedResponse(),
          }
        )
        .get(
          '/:id',
          async ({ store: { usersDb }, params }) => {
            const user = await usersDb
              .select()
              .from(users)
              .where(eq(users.googleId, params.id));

            return {
              data: user && user[0] ? user[0] : null,
            };
          },
          {
            params: t.Object({ id: t.String() }),
            query: t.Object({
              secret: t.String(),
            }),
            beforeHandle: ({ store: { env }, query: { secret } }) => {
              if (secret !== env.INTERNAL_COMUNICATION_SECRET) {
                throw new Error();
              }
            },
            error: () => BadRequest(),
          }
        )
    )
    .get(
      '/verify',
      async ({ access, store: { redis, env } }) => {
        const {
          payload: { id, role },
        } = verify(access, env.JWT_SECRET) as any;
        const token = await redis.get('access-block', id);
        return token ? NotAuthorizedResponse() : Response.json({ id, role });
      },
      {
        beforeHandle: ({ access, refresh }) => {
          if (!access || !refresh) {
            return NotAuthorizedResponse();
          }
        },
        error: tokenExpireFlow,
      }
    )
    .listen(
      {
        port: env.AUTH_QUERY_SERVICE_PORT,
        hostname: env.AUTH_QUERY_SERVICE_HOST,
      },
      () => {
        logger.info(
          `Auth query service started on port ${env.AUTH_QUERY_SERVICE_PORT}`
        );
      }
    );
});
