// import jwt from 'jsonwebtoken';
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

// const HTTP_STATUSES = {
//   401: 'Unauthorized',
// };
const verifyClient = (info: unknown, cb: (boolean) => void) => {
  // console.log('info', info);
  return cb(true);
  // const userToken = info.req.headers.token;

  // if (!userToken) cb(false, 401, HTTP_STATUSES[401]);
  // else {
  //   jwt.verify(token, 'secret-key', function (err, decoded) {
  //     if (err) {
  //       cb(false, 401, 'Unauthorized');
  //     } else {
  //       info.req.user = decoded; //[1]
  //       cb(true);
  //     }
  //   });
  // }
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
  logger.info('ENV reading success');
  await createEventBusConnection(getEnv('RABBIT_URL'));
  logger.info('Event bus connection success');
  await addExchangeAndQueue('GW-AUTH', 'GW-AUTH', true);
  logger.info('Event bus create/check GW-AUTH exchange and queue success');
  await addExchangeAndQueue('AUTH-GW', 'AUTH-GW', false);
  logger.info('Event bus create/check AUTH-GW exchange and queue success');
  await subscribeToQueue('AUTH-GW', (event) => pushFront(event));

  logger.info('Subscription to queue AUTH-GW success');
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

  return {
    closeConnection: closeEventBusConnection,
  };
};
(async () => {
  await bootstrap();
  process.on('SIGTERM', async () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    await closeEventBusConnection();
    killServer();
  });
})();
