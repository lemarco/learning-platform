import z from 'zod';
import {
  createEnvStore,
  KafkaProducer,
  logger,
  KafkaConsumer,
} from 'framework';

import { Context, Elysia, t } from 'elysia';

const env = createEnvStore(
  z.object({
    GATEWAY_HOST: z.string(),
    GATEWAY_PORT: z.string().transform((val) => +val),
    INTERNAL_COMUNICATION_SECRET: z.string(),
    AUTH_QUERY_SERVICE_PORT: z.string().transform((val) => +val),
    AUTH_QUERY_SERVICE_HOST: z.string(),
  })
);
const connections = new Map();

const app = new Elysia()
  .ws('/ws', {
    async open(ws) {
      console.log('ON OPEN');
      try {
        console.log(
          `http://${env.AUTH_QUERY_SERVICE_HOST}:${env.AUTH_QUERY_SERVICE_PORT}/auth/verify`
        );
        const data = await fetch(
          `http://${env.AUTH_QUERY_SERVICE_HOST}:${env.AUTH_QUERY_SERVICE_PORT}/auth/verify`
        ).then((data) => {
          console.log('data', data);

          return data.json();
        });
        const { id, role } = data as { id: string; role: string };
        connections.set(id, ws);
      } catch (e) {
        logger.error('ERROR ON WEBSOCKET CONNECTION');
        ws.close();
      }
    },

    message(ws, message) {
      ws.send(message);
    },
  })
  .listen(
    {
      port: env.GATEWAY_PORT,
      hostname: env.GATEWAY_HOST,
    },
    () => {
      logger.info(`Gateway started on port ${env.GATEWAY_PORT}`);
    }
  );
