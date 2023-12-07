import { createEnvStore, getEnv } from '@learning-platform-monorepo/env';
import { createServer } from 'http';

import { migrator } from '@learning-platform-monorepo/migrator';
import path from 'path';
import { dbConnect } from './db';

const httpHandler = (req, res) => {
  console.log('req.url= ' + req.url);
  res.end();
};
export let db;
const bootstrap = async () => {
  createEnvStore([
    'USERS_SERVICE_HOST',
    'USERS_SERVICE_PORT',
    'USERS_DB_HOST',
    'USERS_DB_USER',
    'USERS_DB_NAME',
    'USERS_DB_PWD',
  ]);
  const dbCredentials = {
    host: getEnv('USERS_DB_HOST'),
    user: getEnv('USERS_DB_USER'),
    database: getEnv('USERS_DB_NAME'),
    password: getEnv('USERS_DB_PWD'),
  };
  const environment = {
    host: getEnv('USERS_SERVICE_HOST'),
    port: +getEnv('USERS_SERVICE_PORT'),
  };
  const server = createServer(httpHandler);
  const migrationsFolder = path.resolve('./apps/service-users/migrations');
  await migrator(dbCredentials, migrationsFolder);
  db = dbConnect(dbCredentials);
  server.listen(environment.port);
};
bootstrap();
