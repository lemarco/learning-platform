import { getEnv } from '@learning-platform-monorepo/env';

// console.log("getEnv('USERS_SERVICE_PORT')= ", getEnv('USERS_SERVICE_PORT'));
// console.log('environment = ', environment);

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

// import { migrator } from './migrator';

const environment = {
  db_host: getEnv('USERS_DB_HOST'),
  db_user: getEnv('USERS_DB_USER'),
  db_name: getEnv('USERS_DB_NAME'),
  db_password: getEnv('USERS_DB_PWD'),
};

const pool = new Pool({
  host: environment.db_host,
  user: environment.db_user,
  database: environment.db_name,
  password: environment.db_password,
});

// await migrator({ host, user, database, password });
export const db = drizzle(pool, { schema });
