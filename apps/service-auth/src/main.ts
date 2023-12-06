import { createEnvStore, getEnv } from '@learning-platform-monorepo/env';
import {
  connectRedis,
  disconnectRedis,
} from '@learning-platform-monorepo/redis';
import {
  addExchangeAndQueue,
  closeEventBusConnection,
  createEventBusConnection,
  publish,
  subscribeToQueue,
} from '@learning-platform-monorepo/rabbit';
import { logger } from '@learning-platform-monorepo/logger';
import { Event } from '@learning-platform-monorepo/events';
import { listen } from './http-server';
export const authPrefix = 'auth-token**';
const supportedEventNames = [
  'REQUEST_GOOGLE_LINK',
  'REQUEST_GOOGLE_SIGNIN',
  'REQUEST_LOGOUT',
];

const eventsTableQueueMatch = {
  AUTH: 'GW-AUTH',
};
const handler = async (event: Event<unknown>) => {
  logger.info(`Event - ${JSON.stringify(event)}`);
  await publish('AUTH-GW', event);
};

const bootstrap = async () => {
  createEnvStore([
    'RABBIT_URL',
    'RABBITMQ_USER',
    'RABBITMQ_PASSWORD',
    'REDIS_HOST',
    'REDIS_PORT',
    'AUTH_SERVICE_PORT',
  ]);

  await Promise.all([
    createEventBusConnection(getEnv('RABBIT_URL')),
    connectRedis({
      host: getEnv('REDIS_HOST'),
      port: +getEnv('REDIS_PORT'),
    }),
  ]);
  await Promise.all([
    addExchangeAndQueue('GW-AUTH', 'GW-AUTH', false),
    addExchangeAndQueue('AUTH-GW', 'AUTH-GW', true),
    addExchangeAndQueue('USERS', 'USERS', true),
  ]);
  await subscribeToQueue('GW-AUTH', (event) => handler(event));
  listen(+getEnv('AUTH_SERVICE_PORT'));
};
(async () => {
  await bootstrap();
  process.on('SIGTERM', async () => {
    logger.info('START GRACEFULL SHUTDOWN');
    await closeEventBusConnection();
    await disconnectRedis();
  });
})();
