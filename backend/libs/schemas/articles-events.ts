import { jsonb, pgTable, smallint, text, timestamp, uuid } from "drizzle-orm/pg-core";
export const articlesEvents = pgTable("articles_events", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  version: smallint("version"),
  causationId: uuid("causationId"),
  timestamp: timestamp("timestamp").defaultNow(),
  payload: jsonb("payload"),
});
