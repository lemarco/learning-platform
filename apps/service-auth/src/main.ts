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
  logger.info('ENV reading success');
  await createEventBusConnection(getEnv('RABBIT_URL'));
  logger.info('Event bus connection success');
  await addExchangeAndQueue('GW-AUTH', 'GW-AUTH', false);
  logger.info('Event bus create/check GW-AUTH exchange and queue success');
  await addExchangeAndQueue('AUTH-GW', 'AUTH-GW', true);
  logger.info('Event bus create/check AUTH-GW exchange and queue success');
  await subscribeToQueue('GW-AUTH', (event) => handler(event));
  logger.info('Subscription to queue AUTH-GW success');
  await connectRedis({
    host: getEnv('REDIS_HOST'),
    port: +getEnv('REDIS_PORT'),
  });
  logger.info('REDIS connection success');
  listen(+getEnv('AUTH_SERVICE_PORT'));
  logger.info('HTTP server establishing success');
};
(async () => {
  await bootstrap();
  process.on('SIGTERM', async () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    await closeEventBusConnection();
    await disconnectRedis();
  });
})();
