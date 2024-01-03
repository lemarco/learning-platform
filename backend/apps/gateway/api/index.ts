import Elysia, { Context, Handler } from "elysia";
import { App } from "..";

export const ApiRoutesHandler = (app: App) =>
  app.group("/api", (app) =>
    app.get("/", (ctx) => {
      ctx.store;
      return new Response();
    }),
  );
