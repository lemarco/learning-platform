import { pgTable, uuid, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core';
export const roleEnum = pgEnum('role', ['ADMIN', 'USER']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  image: varchar('image'),

  googleId: varchar('string'),
  role: roleEnum('role').default('USER').notNull(),
  locale: varchar('locale'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});
