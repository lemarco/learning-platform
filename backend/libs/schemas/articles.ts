import { jsonb, pgTable, smallint, text, timestamp, uuid } from "drizzle-orm/pg-core";
export const articles = pgTable("articles", {
  id: uuid("id").primaryKey(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  data: text("payload").notNull(),
  author: uuid("id").notNull(),
  likeAmount: smallint("likeAmount").default(0),
  dislikeAmout: smallint("dislikeAmout").default(0),
  previewImageLink: text("previewImageLink").notNull(),
  previewSlice: smallint("previewSlice").notNull(),

  estimatedReadTime: smallint("estimatedReadTime").default(1),
});

export const userBookmarks = pgTable("userBookmarks", {
  userId: uuid("userId"),
  articleId: uuid("articleId"),
});

export const Tags = pgTable("tags", {
  tag: text("tag").notNull(),
  articleId: uuid("articleId").notNull(),
});
