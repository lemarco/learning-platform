import { NotAuthorizedResponse } from "framework";
import { verify } from "jsonwebtoken";
import { App } from "..";
export const LogoutGroupHandler = (app: App) =>
  app
    .derive(({ cookie }) => ({
      access: cookie.access_token.get(),
      refresh: cookie.refresh_token.get(),
    }))
    .get(
      "/logout",
      async ({ access, refresh, store: { redis, env } }) => {
        const { id } = verify(access, env.JWT_SECRET) as { id: string };
        await redis.setWithExpiry("access-block", id, refresh, 15);
        return new Response("", {
          status: 200,
          headers: {
            "Set-Cookie": "access=; Max-Age=0;HttpOnly;,refresh=; Max-Age=0;HttpOnly;",
          },
        });
      },
      {
        error: async (e) => NotAuthorizedResponse(),
        beforeHandle: ({ access, refresh }) => {
          if (!access || !refresh) {
            return NotAuthorizedResponse();
          }
        },
      },
    );
