import { count, eq } from "drizzle-orm";
import { t } from "elysia";
import { articles } from "schemas/articles";
import type { App } from "..";
export const ArticleGroupHandler = (app: App) => {
  return app
    .get(
      "/:id",
      async ({ articlesdb, query }) => {
        const articlesFromDb = await articlesdb.select().from(articles).where(eq(articles.id, query.id));
        return Response.json({
          data: {
            article: articlesFromDb[0] ? articlesFromDb[0] : null,
          },
        });
      },
      {
        query: t.Object({
          id: t.String(),
        }),
      },
    )
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
