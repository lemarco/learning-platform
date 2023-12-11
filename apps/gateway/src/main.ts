import { createEnvStore, getEnv } from '@learning-platform-monorepo/env';

import {
  addExchangeAndQueue,
  closeEventBusConnection,
  createEventBusConnection,
  publish,
  subscribeToQueue,
} from '@learning-platform-monorepo/rabbit';
import { logger } from '@learning-platform-monorepo/logger';
import { createServer, killServer, pushFront } from './gateway';
// const token = jwt.sign({ name: 'iostreamer' }, 'secret-key', {
//   expiresIn: 15 * 24 * 60 * 60 * 1000, // 15 days
// });

const HTTP_STATUSES = {
  401: 'Unauthorized',
};

const AUTH_SERVICE = {
  host: getEnv('AUTH_SERVICE_HOST'),
  port: +getEnv('AUTH_SERVICE_PORT'),
};
const verifyClient = async (
  info: { req },
  cb: (boolean, code?: number, stutus?: string) => void
) => {
  const headers = info.req.headers;
  console.log('Headers:', headers);

  // Access cookies
  const cookies = info.req.headers.cookie;
  console.log('Cookies:', cookies);

  return await fetch(
    `http://${AUTH_SERVICE.host}:${AUTH_SERVICE.port}/verify`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        access: 'asdasd',
        refresh: 'asdasd',
      }),
    }
  )
    .then((data) => data.json())
    .then(() => cb(true))
    .catch(() => cb(false, 401, HTTP_STATUSES[401]));
};
const eventsTableQueueMatch = {
  AUTH: 'GW-AUTH',
};

const bootstrap = async () => {
  createEnvStore([
    'RABBIT_URL',
    'RABBITMQ_USER',
    'RABBITMQ_PASSWORD',
    'GATEWAY_PORT',
  ]);
  await createEventBusConnection(getEnv('RABBIT_URL'));
  await addExchangeAndQueue('GW-AUTH', 'GW-AUTH', true);
  await addExchangeAndQueue('AUTH-GW', 'AUTH-GW', false);
  await subscribeToQueue('AUTH-GW', (event) => pushFront(event));
  createServer({
    port: getEnv('GATEWAY_PORT'),
    verifyClient,
    connectionMessage: 'CONNECTED',
    handler: async (data, connectionId: string) => {
      try {
        const event = JSON.parse(data.toString('utf-8'));
        logger.info(
          'incommingEvent = ' +
            JSON.stringify({
              queueToPublish: eventsTableQueueMatch[event.name],
              event,
              connectionId,
              eventToPublish: {
                ...event,
                connectionId,
              },
            })
        );

        await publish(eventsTableQueueMatch[event.name], {
          ...event,
          connectionId,
        });
      } catch (e) {
        logger.error('Error while parsing incomming message: ' + e.message);
      }
    },
    onSetup: () =>
      logger.info(
        'Server creation success',
        'Gateway setup completed.Listening websocket connections on 8080...'
      ),
  });
};
(async () => {
  await bootstrap();
  process.on('SIGTERM', async () => {
    logger.info('SIGTERM signal received.');
    logger.info('Closing http server.');
    await closeEventBusConnection();
    killServer();
  });
})();
