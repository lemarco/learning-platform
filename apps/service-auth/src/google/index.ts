import { RedisService } from '../../infra/redis/redis.service';

import { google } from 'googleapis';
import { setRecord } from '@learning-platform-monorepo/redis';
import { UsersService } from '../users/users.service';

import { getEnv } from '@learning-platform-monorepo/env';
import jwt from 'jsonwebtoken';
import { HttpException } from '@learning-platform-monorepo/server-errors';
import { authPrefix } from '../main';
import { generateRefreshToken } from '../tokens';
const getGoogleUserLink = (token: string) =>
  `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`;

const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];
export const createBearerHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

const halfyear = 60 * 60 * 24 * 30 * 6;
const oauth2ClientGoogle = new google.auth.OAuth2({
  clientId: getEnv('GOOGLE_CLIENT_ID'),
  clientSecret: getEnv('GOOGLE_CLIENT_SECRET'),
  redirectUri: getEnv('OAUTH_REDIRECT_URL'),
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
const getGoogleUserName = (googleUserData) =>
  `${googleUserData.given_name} ${googleUserData.family_name}`;

const createUpdateUserEvent = (dbUser: any, googleUserData: any) => {
  const event = {
    type: 'UPDATE_USER',
    payload: {
      id: dbUser.id,
      name: dbUser.name || getGoogleUserName(googleUserData),
      image: googleUserData.picture,
      googleId: googleUserData.id,
      email: googleUserData.email,
      locale: googleUserData.locale,
    },
  };
  return event;
};
const createCreateUserEvent = (googleUserData: any) => {
  const event = {
    type: 'CREATE_USER',
    payload: {
      googleId: googleUserData.id,
      email: googleUserData.email,
      image: googleUserData.picture,
      name: getGoogleUserName(googleUserData),
      locale: googleUserData.locale,
    },
  };
  return event;
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

  let dbUser = await usersService.getByGoogleId(googleUser?.id || '');
  let event;
  if (dbUser && dbUser.id) {
    event = createUpdateUserEvent(dbUser, googleUser);
  } else {
    event = createCreateUserEvent(googleUser);
  }
  publish(event);
  await setRecord(
    authPrefix,
    dbUser.id,
    JSON.stringify({
      ip,
      useragent,
      user: { id: String(dbUser.id), role: String(dbUser.role) },
    })
  );

  const token = await jwt.sign({ user: dbUser }, getEnv('JWT_SECRET'));
  return {
    access: token,
    refresh: generateRefreshToken(32),
  };
};
export const generateAuthUrl = async (): Promise<{ link: string }> => {
  const link = await oauth2ClientGoogle.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });

  return { link };
};
