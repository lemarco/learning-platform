import { sign } from 'jsonwebtoken';
import { oauth2ClientGoogle } from '../google-client';
import { createCreateUserEvent, createUpdateUserEvent } from '../events';
import { randomUUID } from 'crypto';
import { KafkaProducer, NotAuthorizedResponse, Redis, getEnv } from 'framework';
import { DURATION_UNITS } from 'utils/datetime';
const secret = getEnv<string>('JWT_SECRET');

export const gooogleSignin = async ({
  code,
  ip,
  userAgent,
  eventProducer,
  redis,
}: {
  code: string;
  ip: string;
  userAgent: string;
  eventProducer: KafkaProducer;
  redis: Redis;
}) => {
  const { tokens } = await oauth2ClientGoogle.getToken(code);

  if (!tokens.id_token || !tokens.access_token) {
    return NotAuthorizedResponse();
  }
  oauth2ClientGoogle.setCredentials(tokens);
  const googleUser = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${tokens.id_token}`,
      },
    }
  ).then((data) => data.json());
  if (!googleUser) {
    return NotAuthorizedResponse();
  }
  const dbUser = await fetch(
    `http://${getEnv('USER_SERVICE_HOST')}:${getEnv(
      'USER_SERVICE_PORT'
    )}/users/google/${googleUser?.id}`
  ).then((data) => data.json());

  const usersEvent = dbUser
    ? createUpdateUserEvent(dbUser, googleUser)
    : createCreateUserEvent(googleUser);

  const tokenData = { id: dbUser.id, role: dbUser.role };
  const refresh = sign(tokenData, secret, {
    expiresIn: '7d',
  });
  const access = sign(tokenData, secret, {
    expiresIn: '15m',
  });
  await redis.setWithExpiry('refresh', dbUser.id, refresh, DURATION_UNITS.w);
  const authEvent = {
    id: randomUUID(),
    name: 'TokenPairIssued',
    version: 1,
    causationId: '',
    timestamp: new Date().toISOString(),
    data: {
      refresh,
      access,
    },
  };
  eventProducer.produceMessage('AUTH_EVENTS_TOPIC', JSON.stringify(authEvent));
  eventProducer.produceMessage(
    'USERS_EVENTS_TOPIC',
    JSON.stringify(usersEvent)
  );
  return Response.json({ refresh, access });
};
