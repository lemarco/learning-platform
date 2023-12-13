import { sign, verify } from 'jsonwebtoken';
import { oauth2ClientGoogle } from './google-client';
import z from 'zod';
import {
  getEnv,
  createEnvStore,
  KafkaProducer,
  Redis,
  Logger,
  logger,
  NotAuthorizedResponse,
} from 'framework';
import { randomUUID } from 'crypto';
import Elysia from 'elysia';
import { DURATION_UNITS } from 'utils/datetime';
const secret = getEnv<string>('JWT_SECRET');
const linkProperties = {
  access_type: 'offline',
  prompt: 'consent',
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
};
const env = createEnvStore(
  z.object({
    AUTH_QUERY_SERVICE_PORT: z.number(),
    AUTH_QUERY_SERVICE_HOST: z.string(),
    JWT_SECRET: z.string(),
    AUTH_TOKEN_STORE_HOST: z.string(),
    AUTH_TOKEN_STORE_PORT: z.number(),
    OAUTH_REDIRECT_URL: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
  })
);
const verifyHandler = async ({
  access,
  store: { redis },
}: {
  access: string;
  store: Store;
}) => {
  const {
    payload: { id, role },
  } = verify(access, secret) as any;
  const token = await redis.get('access-block', id);
  return token ? NotAuthorizedResponse() : Response.json({ id, role });
};
const tokenExpireFlow = async ({
  error,
  refresh,
  store: { eventProducer, env },
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
  const { payload } = verify(token, secret) as any;
  // issue new token pair
  const { id, role } = payload;
  const newRefresh = sign({ id, role }, secret, {
    expiresIn: '7d',
  });
  const newAccess = sign({ id, role }, secret, {
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
type Store = {
  redis: Redis;
  eventProducer: KafkaProducer;
  env: Record<string, string>;
  logger: Logger;
};

const redis = new Redis({
  host: getEnv('AUTH_TOKEN_STORE_HOST'),
  port: getEnv<number>('AUTH_TOKEN_STORE_PORT'),
  logger,
});
const eventProducer = new KafkaProducer();
const app = new Elysia().group('/auth', (app) =>
  app
    .state('env', env)
    .state('logger', logger)
    .state('redis', redis)
    .state('eventProducer', eventProducer)
    .derive(({ cookie }) => ({
      access: cookie['access_token'].get(),
      refresh: cookie['refresh_token'].get(),
    }))
    .group('/google', (app) =>
      app.get(
        '/link',
        async () => ({
          link: await oauth2ClientGoogle.generateAuthUrl(linkProperties),
        }),
        {
          error: () => NotAuthorizedResponse(),
        }
      )
    )
    .get('/verify', verifyHandler, {
      beforeHandle: ({ access, refresh }) => {
        if (!access || !refresh) {
          return NotAuthorizedResponse();
        }
      },
      error: tokenExpireFlow,
    })
    .listen({
      port: getEnv<number>('AUTH_QUERY_SERVICE_PORT'),
      hostname: getEnv('AUTH_QUERY_SERVICE_HOST'),
    })
);
