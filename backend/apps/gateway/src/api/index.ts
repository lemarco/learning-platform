import Elysia, { Context, Handler } from "elysia";
import { App, servicesBaseUrls } from "..";

const ArticlesGroupHandler = (app: App) => {
  return app.group("/articles", (app) => {
    return app
      .get("/", ({ query, logger }) => {
        console.log("api/articles/");
        logger.info("api/articles/");
        return fetch(`${servicesBaseUrls.authQuery}?limit=${query.limit}&page=${query.page}`);
      })
      .get("/:id", ({ query, logger }) => {
        console.log(`api/articles/${query.id}`);
        logger.info(`api/articles/${query.id}`);
        return fetch(`${servicesBaseUrls.authQuery}${query.id}`);
      })
      .get("/related", ({ logger }) => {
        // console.log(`api/articles/related`);
        // logger.info(`api/articles/related`);
        return fetch(`${servicesBaseUrls.authQuery}related`);
      })
      .get("/latest", ({ logger }) => {
        // console.log(`api/articles/related`);
        // logger.info(`api/articles/related`);
        return fetch(`${servicesBaseUrls.authQuery}latest`);
      })
      .get("/tags/recomeded", ({ logger }) => {
        // console.log(`api/tags/recomeded`);
        // logger.info(`api/tags/recomeded`);
        return fetch(`${servicesBaseUrls.authQuery}/tags/recommended`);
      });
  });
};

const ProfileGroupHandler = (app: App) => {
  return app.group("/profile", (app) => {
    return app.get("/:id", ({ query }) => fetch(`${servicesBaseUrls.usersQuery}${query.id}`));
  });
};

export const ApiRoutesHandler = (app: App) => app.group("/api", (app) => app.use(ArticlesGroupHandler).use(ProfileGroupHandler));
