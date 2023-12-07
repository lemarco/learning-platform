import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const dbConnect = (dbCredentials) => {
  const pool = new Pool(dbCredentials);
  return drizzle(pool, { schema });
};
