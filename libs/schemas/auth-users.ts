import { pgTable, text, uuid } from "drizzle-orm/pg-core";
export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  googleId: text("googleId").notNull(),
  role: text("role").notNull(),
});
