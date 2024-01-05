import { articles } from "schemas/articles";
import type { App } from "..";
import { eq } from "drizzle-orm";
import { t } from "elysia";
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
    .get("/", () => {});
};
