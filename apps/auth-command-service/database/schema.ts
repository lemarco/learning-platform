import {
  pgTable,
  smallint,
  text,
  uuid,
  jsonb,
  timestamp,
} from 'drizzle-orm/pg-core';
export const events = pgTable('auth_events', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  version: smallint('version'),
  causationId: uuid('causationId'),
  timestamp: timestamp('timestamp').defaultNow(),
  payload: jsonb('payload'),
});
