import { createEnvStore, getEnv } from '@learning-platform-monorepo/env';
import { createServer } from 'http';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { migrator } from '@learning-platform-monorepo/migrator';

const dbCredentials = {
  host: getEnv('USERS_DB_HOST'),
  user: getEnv('USERS_DB_USER'),
  database: getEnv('USERS_DB_NAME'),
  password: getEnv('USERS_DB_PWD'),
};

const pool = new Pool(dbCredentials);

export const db = drizzle(pool, { schema });

const httpHandler = (req, res) => {
  console.log('req.url= ' + req.url);
  res.end();
};

const bootstrap = async () => {
  createEnvStore([
    'USERS_SERVICE_HOST',
    'USERS_SERVICE_PORT',
    'USERS_DB_HOST',
    'USERS_DB_USER',
    'USERS_DB_NAME',
    'USERS_DB_PWD',
  ]);
  const environment = {
    host: getEnv('USERS_SERVICE_HOST'),
    port: +getEnv('USERS_SERVICE_PORT'),
  };
  const server = createServer(httpHandler);
  await migrator(dbCredentials);
  server.listen(environment.port);
};
bootstrap();
