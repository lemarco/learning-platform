import { BadRequest, NotAuthorizedResponse } from "framework";
import { App } from "..";
import { users } from "schemas";
import { eq } from "drizzle-orm";
import { oauth2ClientGoogle } from "./google-client";
import { t } from "elysia";
const linkProperties = {
  access_type: "offline",
  prompt: "consent",
  scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
};
export const GoogleHandlerGroup = (app: App) => {
  return app.group("/google", (app) =>
    app
      .get(
        "/link",

        async () => ({
          link: await oauth2ClientGoogle.generateAuthUrl(linkProperties),
        }),
        {
          beforeHandle: () => console.log("/auth/google/link triggered"),
          error: () => NotAuthorizedResponse(),
        },
      )
      .get(
        "/:id",
        async ({ store: { usersDb }, params }) => {
          const user = await usersDb.select().from(users).where(eq(users.googleId, params.id));

          return {
            data: user?.[0] ? user[0] : null,
          };
        },
        {
          params: t.Object({ id: t.String() }),
          query: t.Object({
            secret: t.String(),
          }),
          beforeHandle: ({ store: { env }, query: { secret } }) => {
            if (secret !== env.INTERNAL_COMUNICATION_SECRET) {
              throw new Error();
            }
          },
          error: () => BadRequest(),
        },
      ),
  );
};
