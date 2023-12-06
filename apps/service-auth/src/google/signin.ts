import { setRecord } from '@learning-platform-monorepo/redis';
import { getEnv } from '@learning-platform-monorepo/env';
import jwt from 'jsonwebtoken';
import { HttpException } from '@learning-platform-monorepo/server-errors';
import { authPrefix } from '../main';
import { generateRefreshToken } from '../tokens';
import { oauth2ClientGoogle } from './client';
import { createCreateUserEvent, createUpdateUserEvent } from '../events';
import { publish } from '@learning-platform-monorepo/rabbit';
const getGoogleUserLink = (token: string) =>
  `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`;

const userService = {
  host: getEnv('USER_SERVICE_HOST'),
  port: +getEnv('USER_SERVICE_PORT'),
};
const createBearerHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});
const getGoogleUser = async (code: string) => {
  const { tokens } = await oauth2ClientGoogle.getToken(code);

  if (!tokens.id_token || !tokens.access_token) {
    throw new HttpException('Unauthorized');
  }
  oauth2ClientGoogle.setCredentials(tokens);
  try {
    const data = await fetch(getGoogleUserLink(tokens.access_token), {
      headers: createBearerHeader(tokens.id_token),
    });
    return await data.json();
  } catch (e) {
    throw new HttpException('Unauthorized');
  }
};

const getByGoogleId = async (id: string) => {
  try {
    const data = await fetch(
      `http://${userService.host}:${userService.port}/users/google/${id}`
    );
    if (data.ok) {
      return await data.json();
    }
    return null;
  } catch (e) {
    return null;
  }
};
export const gooogleSignin = async ({
  ip,
  useragent,
  code,
}: {
  ip: string;
  useragent: string;
  code: string;
}) => {
  const googleUser = await getGoogleUser(code);
  if (!googleUser) {
    // TODO: DEFINE SPECIFIC  ERROR
    throw new Error();
  }

  const dbUser = await getByGoogleId(googleUser?.id || '');
  const event = dbUser
    ? createUpdateUserEvent(dbUser, googleUser)
    : createCreateUserEvent(googleUser);
  const [token] = await Promise.all([
    jwt.sign({ user: dbUser }, getEnv('JWT_SECRET')),
    publish('USERS', event as any),
    setRecord(
      authPrefix,
      dbUser.id,
      JSON.stringify({
        ip,
        useragent,
        user: { id: String(dbUser.id), role: String(dbUser.role) },
      })
    ),
  ]);

  return {
    access: token,
    refresh: generateRefreshToken(32),
  };
};
