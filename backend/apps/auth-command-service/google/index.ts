import { App } from "..";
import { gooogleSignin } from "./signin";
import { BadRequest } from "framework";
export const GoogleLoginGroupHandler = (app: App) => {
  return app.group("/google", (app) =>
    app
      .derive(({ request, query, headers, store }) => {
        const code = String(query.code);
        const userAgent = headers["user-agent"] || "";
        const clientIP = app.server?.requestIP(request)?.address || "";
        return {
          code,
          userAgent,
          ip: clientIP,
          eventProducer: store.eventProducer,
          redis: store.redis,
          env: store.env,
        };
      })
      .get("/signin", gooogleSignin, {
        beforeHandle: ({ query }) => {
          const code = query.code;
          if (!code) {
            return BadRequest();
          }
        },
      }),
  );
};
