import Elysia, { Context, Handler } from "elysia";
import { App, servicesBaseUrls } from "..";

const ArticlesGroupHandler = (app: App) => {
  return app.group("/articles", (app) => {
    return app
      .get("/", ({ query }) => fetch(`${servicesBaseUrls.authQuery}?limit=${query.limit}&page=${query.page}`))
      .get("/:id", ({ query }) => fetch(`${servicesBaseUrls.authQuery}${query.id}`))
      .get("/related", () => fetch(`${servicesBaseUrls.authQuery}related`))
      .get("/latest", () => fetch(`${servicesBaseUrls.authQuery}latest`))
      .get("/tags/recomeded", () => fetch(`${servicesBaseUrls.authQuery}/tags/recommended`));
  });
};

const ProfileGroupHandler = (app: App) => {
  return app.group("/profile", (app) => {
    return app.get("/:id", ({ query }) => fetch(`${servicesBaseUrls.usersQuery}${query.id}`));
  });
};

export const ApiRoutesHandler = (app: App) => app.group("/api", (app) => app.use(ArticlesGroupHandler).use(ProfileGroupHandler));
