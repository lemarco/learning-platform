import { count, eq } from "drizzle-orm";
import { t } from "elysia";
import { articles, tags } from "schemas/articles";
import type { App } from "..";
export const ArticleGroupHandler = (app: App) => {
  return app
    .get("/related", async ({ articlesdb }) => {
      const articlesFromDb = await articlesdb.select().from(articles).limit(3);

      return Response.json({
        data: {
          list: articlesFromDb ? articlesFromDb : [],
        },
      });
    })
    .get("/latest", async ({ articlesdb }) => {
      const articlesFromDb = await articlesdb.select().from(articles).limit(6);

      return Response.json({
        data: {
          list: articlesFromDb ? articlesFromDb : [],
        },
      });
    })
    .get("/tags/recomeded", async ({ articlesdb }) => {
      const tagsFromDb = await articlesdb.select().from(tags).limit(10);

      return Response.json({
        data: {
          list: tagsFromDb ? tagsFromDb : [],
        },
      });
    })
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
      async ({ query: { page, limit }, articlesdb }) => {
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
        query: t.Object({
          page: t.Number(),
          limit: t.Number(),
        }),
      },
    );
};
