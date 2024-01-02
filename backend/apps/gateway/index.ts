import { KafkaConsumer, KafkaProducer, createEnvStore, logger } from "framework";
import z from "zod";

import { Context, Elysia, t } from "elysia";

const env = createEnvStore(
  z.object({
    GATEWAY_HOST: z.string(),
    GATEWAY_PORT: z.string().transform((val) => +val),
    INTERNAL_COMUNICATION_SECRET: z.string(),
    AUTH_QUERY_SERVICE_PORT: z.string().transform((val) => +val),
    AUTH_QUERY_SERVICE_HOST: z.string(),
  }),
);
const connections = new Map();

const app = new Elysia()
  .ws("/ws", {
    async open(ws) {
      //  console.log("ON OPEN SOCKET");
      try {
        //  console.log(`http://${env.AUTH_QUERY_SERVICE_HOST}:${env.AUTH_QUERY_SERVICE_PORT}/auth/verify`);
        const data = await fetch(`http://${env.AUTH_QUERY_SERVICE_HOST}:${env.AUTH_QUERY_SERVICE_PORT}/auth/verify`).then((data) =>
          data.json(),
        );
        const { id, role } = data as { id: string; role: string };
        connections.set(id, ws);
      } catch (e) {
        logger.error("ERROR ON WEBSOCKET CONNECTION");
        ws.close();
      }
    },

    message(ws, message) {
      ws.send(message);
    },
  })
  .group("/api", (app) =>
    app.get("/", () => {
      return new Response("OK");
    }),
  )
  .group("/auth", (app) =>
    app.get("/", () => {
      return new Response();
    }),
  )
  .listen(
    {
      hostname: '0.0.0.0',
      port: env.GATEWAY_PORT,
    },
    () => logger.info(`Gateway!! started on port ${env.GATEWAY_PORT}`),
  );
