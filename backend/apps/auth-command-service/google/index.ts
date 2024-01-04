import { BadRequest } from "framework";
import { App } from "..";
import { gooogleSignin } from "./signin";
export const GoogleLoginGroupHandler = (app: App) => {
  return app.group("/google", (app) =>
    app
      .derive(({ request, query, headers }) => {
        const code = String(query.code);
        const userAgent = headers["user-agent"] || "";
        const clientIP = app.server?.requestIP(request)?.address || "";
        return {
          code,
          userAgent,
          ip: clientIP,

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
