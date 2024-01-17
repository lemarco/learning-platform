import { randomUUID } from "node:crypto";
import { Elysia, ListenCallback, TraceHandler } from "elysia";
import { KafkaConsumer, KafkaProducer, Logger, createEnvStore, httpApiCall } from "framework";
import z from "zod";
import { ApiRoutesHandler } from "./api";
import { AuthRoutesHandler } from "./auth";

type AnyEvent = {
  type: string;
  payload: unknown;
};

const logger = Logger("Gateway");

const env = createEnvStore(
  z.object({
    GATEWAY_HOST_NAME: z.string(),
    GATEWAY_PORT: z.string().transform((val) => +val),
    INTERNAL_COMUNICATION_SECRET: z.string(),
    AUTH_QUERY_SERVICE_PORT: z.string().transform((val) => +val),
    AUTH_QUERY_SERVICE_HOST_NAME: z.string(),
    USERS_QUERY_SERVICE_PORT: z.string().transform((val) => +val),
    USERS_QUERY_SERVICE_HOST_NAME: z.string(),
    AUTH_COMMANDS_SERVICE_PORT: z.string().transform((val) => +val),
    AUTH_COMMANDS_SERVICE_HOST_NAME: z.string(),
  }),
  logger,
);

const connections = new Map();
export const servicesBaseUrls = {
  authQuery: `http://${env.AUTH_QUERY_SERVICE_HOST_NAME}:${env.AUTH_QUERY_SERVICE_PORT}/`,
  usersQuery: `http://${env.USERS_QUERY_SERVICE_HOST_NAME}:${env.USERS_QUERY_SERVICE_PORT}/`,
  authCommand: `http://${env.AUTH_COMMANDS_SERVICE_HOST_NAME}:${env.AUTH_COMMANDS_SERVICE_PORT}/`,
};

const ListenConfig = {
  hostname: "0.0.0.0",
  port: env.GATEWAY_PORT,
};

const onStart: ListenCallback = () => logger.info(`Gateway started on port ${env.GATEWAY_PORT}`);
const tracer: TraceHandler = (req) => logger.info(req);

const app = new Elysia()
  .get("/", () => new Response("OK"))
  .decorate("env", env)
  .decorate("logger", logger)
  .trace(tracer)
  .ws("/ws", {
    async open(ws) {
      // console.log("ws =", ws);
      const data = await httpApiCall(`${servicesBaseUrls.authQuery}/auth/verify`);
      console.log("data =", data);
      // if (!data) {
      //   ws.close();
      // }
      // const { id, role } = data as { id: string; role: string };
      //logger.info("WS connection ID = ", ws.id);
      const id = randomUUID();
      connections.set(id, ws);
    },
    message(ws, message) {
      console.log("message= ", message);

      const msg = message as AnyEvent;
      ws.send("message back");
    },
  })
  .listen(ListenConfig);

export type App = typeof app;

app.use(ApiRoutesHandler).use(AuthRoutesHandler);
console.log(app.modules);
app.listen(ListenConfig, onStart);
