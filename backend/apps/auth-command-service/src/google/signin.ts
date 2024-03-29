import { randomUUID } from "crypto";
import { KafkaProducer, NotAuthorizedResponse, Redis, getEnv, httpApiCall } from "framework";
import { sign } from "jsonwebtoken";
import { DURATION_UNITS } from "utils/datetime";
import { createCreateUserEvent, createUpdateUserEvent } from "../events";
import { oauth2ClientGoogle } from "../google-client";
import { GoogleUser } from "../types";

type DbUser = {
  id: string;
  googleId: string;
  role: string;
  name: string;
};

export const gooogleSignin = async ({
  code,
  ip,
  userAgent,
  eventProducer,
  redis,
  env,
}: {
  code: string;
  ip: string;
  userAgent: string;
  eventProducer: KafkaProducer;
  redis: Redis;
  env: Record<string, string | number>;
}) => {
  const { tokens } = await oauth2ClientGoogle.getToken(code);

  if (!tokens.id_token || !tokens.access_token) {
    return NotAuthorizedResponse();
  }
  oauth2ClientGoogle.setCredentials(tokens);
  const googleUser = await httpApiCall<GoogleUser>(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${tokens.id_token}`,
      },
    },
  );
  if (!googleUser) {
    return NotAuthorizedResponse();
  }

  const dbUser = await httpApiCall<{ data: DbUser }>(
    `http://${env.AUTH_QUERY_SERVICE_HOST}:${env.AUTH_QUERY_SERVICE_PORT})}/auth/google/${googleUser?.id}?secret=${env.INTERNAL_COMUNICATION_SECRET}`,
  );

  const usersEvent = dbUser?.data ? createUpdateUserEvent(dbUser.data, googleUser) : createCreateUserEvent(googleUser);

  const tokenData = {
    id: usersEvent.payload.id,
    role: usersEvent.payload.role,
  };
  const refresh = sign(tokenData, env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  const access = sign(tokenData, env.JWT_SECRET as string, {
    expiresIn: "15m",
  });
  await redis.setWithExpiry("refresh", usersEvent.payload.id, refresh, DURATION_UNITS.w);

  const authEvent = {
    id: randomUUID(),
    name: "TokenPairIssued",
    version: 1,
    causationId: "",
    timestamp: new Date().toISOString(),
    data: {
      refresh,
      access,
    },
  };
  eventProducer.produceMessage("AUTH_EVENTS_TOPIC", JSON.stringify(authEvent));
  eventProducer.produceMessage("USERS_EVENTS_TOPIC", JSON.stringify(usersEvent));
  return Response.json({ refresh, access });
};
