import { randomUUID } from "crypto";
import { NotAuthorizedResponse } from "framework";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { DURATION_UNITS } from "utils/datetime";
import { App } from "..";

export const VerifyGroupHandler = (app: App) =>
  app.get(
    "/verify",
    async ({ access, redis, env }) => {
      const {
        payload: { id, role },
      } = verify(access, env.JWT_SECRET) as JwtPayload;
      const token = await redis.get("access-block", id);
      return token ? NotAuthorizedResponse() : Response.json({ id, role });
    },
    {
      beforeHandle: ({ access, refresh }) => {
        if (!access || !refresh) {
          return NotAuthorizedResponse();
        }
      },

      error: async ({ error, refresh, eventProducer, env, redis }) => {
        if (error.name !== "TokenExpiredError") {
          return NotAuthorizedResponse();
        }
        const token = await redis.get("refresh", refresh);
        if (!token) {
          // Expired refresh. User has to login again
          return NotAuthorizedResponse();
        }
        const { payload } = verify(token, env.JWT_SECRET) as JwtPayload;
        // issue new token pair
        const { id, role } = payload;
        const newRefresh = sign({ id, role }, env.JWT_SECRET, {
          expiresIn: "7d",
        });
        const newAccess = sign({ id, role }, env.JWT_SECRET, {
          expiresIn: "15m",
        });
        await redis.setWithExpiry("refresh", id, refresh, DURATION_UNITS.w);
        const event = {
          id: randomUUID(),
          name: "TokenPairIssued",
          version: 1,
          causationId: "",
          timestamp: new Date().toISOString(),
          data: {
            refresh: newRefresh,
            access: newAccess,
          },
        };
        eventProducer.produceMessage("AUTH_EVENTS_TOPIC", JSON.stringify(event));
        return Response.json({
          id,
          role,
          tokens: { access: newAccess, refresh: newRefresh },
        });
      },
    },
  );
