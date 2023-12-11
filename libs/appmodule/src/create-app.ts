import { AppSchema } from './schema';
import { createEnvStore, getEnv } from '@learning-platform-monorepo/env';
// @ts-expect-error old style exports
import express from 'express';

import useragent from 'express-useragent';

import { logger } from '@learning-platform-monorepo/logger';
import { connectRedis } from '@learning-platform-monorepo/redis';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { createEventBusConnection } from '@learning-platform-monorepo/rabbit';

// type EventHandler = () => void;
// type RouteHandler = () => void;

// type Route = [string, RouteHandler]; // path + func
// export type AppSchema = {
//   storage: {
//     // redis expected to receive env variables names
//     host: string;
//     port: string;
//   };
//   queue: {
//     connectionString; //rabbit expected to receive env variable name
//   };
//   database: {
//     migrations: string; // expected to receive path.resolve() result on migrations folder
//     credentias: {
//       // expected to receive env variables names
//       host: string;
//       port: string;
//       password: string;
//       name: string;
//     };
//   };

//   server: {
//     // expected to receive env variables names
//     port: string;
//     host: string;
//   };
//   routes: {
//     //expected to have global try-catch on each route  trycatch(routefunc())
//     get?: Array<Route>;
//     post?: Array<Route>;
//     put?: Array<Route>;
//     delete?: Array<Route>;
//   };
//   events: Record<string, EventHandler>;
//   // expected to define cache mechanic for events that require results from other events
// };

// const createServer = () => {};

// type RouteHandler = async  (req,res)=>void;
// type RouteMap = Record<string,  >
const a = { a: 1 };
const b = { b: 2 };
const c = Object.assign({}, a, b);
console.log(c);
const collectAllEnvsAndCreateStore = ({
  server,
  storage,
  database,

  queue,
}: AppSchema) => {
  const envs = [];
  if (storage) {
    if (storage.host) {
      envs.push(storage.host);
    }
    envs.push(storage.port);
  }
  if (queue) {
    envs.push(queue.connectionString);
  }
  if (server) {
    if (server.host) {
      envs.push(server.host);
    }
    if (server.port) {
      envs.push(server.port);
    }
  }
  if (database) {
    envs.push(database.credentias.host);
    envs.push(database.credentias.port);
    envs.push(database.credentias.password);
    envs.push(database.credentias.name);
  }
  if (envs.length) {
    createEnvStore(envs);
  }
};
export const createApp = async (schema: AppSchema) => {
  collectAllEnvsAndCreateStore(schema);
  let app;
  let db;
  let eventBus;
  const { server, storage, database, routes, events, queue } = schema;
  if (server) {
    app.use(express.json());
    if (server.userAgent) {
      app.use(useragent.express());
    }
    app;
  }
  if (storage) {
    connectRedis({
      host: getEnv(storage.host),
      port: +getEnv(storage.port),
    });
  }
  if (database) {
    const pool = new Pool({
      host: getEnv(database.credentias.host),
      port: +getEnv(database.credentias.port),
      database: getEnv(database.credentias.name),
      password: getEnv(database.credentias.password),
    });
    db = drizzle(pool, { schema: database.schema });
  }
  if (queue) {
    eventBus = await createEventBusConnection(queue.connectionString);
  }
  if (routes) {
    if (routes.delete && routes.delete) {
      for (const [path, handler] of routes.delete) {
        app.delete(path, handler);
      }
    }
    if (routes.get) {
      for (const [path, handler] of routes.get) {
        app.get(path, handler);
      }
    }
    if (routes.post) {
      for (const [path, handler] of routes.post) {
        app.post(path, handler);
      }
    }
    if (routes.put) {
      for (const [path, handler] of routes.put) {
        app.put(path, handler);
      }
    }
  }
  if (server) {
    app.listen(+getEnv(server.port), getEnv(server.host), () =>
      logger.info('HTTP server establishing success')
    );
  }
};
