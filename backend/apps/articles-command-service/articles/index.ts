import { articles } from "schemas/articles";
import type { App } from "..";
import { count, eq } from "drizzle-orm";
import { t } from "elysia";
export const ArticleGroupHandler = (app: App) => {
  return app

  .get(
    "/",
    async ({ body: { page, limit }, articlesdb }) => {
      const articlesFromDb = await articlesdb.select().from(articles).limit(limit);
      const countArticles = await articlesdb.select({ value: count() }).from(articles);
      return Response.json({
        data: {
          count: countArticles[0].value,
          list: articlesFromDb ? articlesFromDb : [],
        },
      });
    },
    {
      body: t.Object({
        page: t.Number(),
        limit: t.Number(),
      }),
    },
  );
};
