import Elysia, { Handler } from "elysia";
import { App } from '..'

export const AuthRoutesHandler = (app: App) =>
    app.group("/auth", app => app.get('/', ctx => {
        ctx.store
        return new Response();
    }))