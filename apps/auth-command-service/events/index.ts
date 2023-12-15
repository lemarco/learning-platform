import { GoogleUser } from '../types';
import { randomUUID } from 'crypto';
const getGoogleUserName = (googleUserData: {
  family_name?: string;
  given_name?: string;
}) => `${googleUserData.given_name} ${googleUserData.family_name}`;
export const createUpdateUserEvent = (
  dbUser: any,
  googleUserData: GoogleUser
) => {
  const event = {
    id: randomUUID(),
    name: 'USER_UPDATED',
    version: 1,
    causationId: '',
    timestamp: new Date().toISOString(),
    payload: {
      id: dbUser.id,
      name: dbUser.name || getGoogleUserName(googleUserData),
      image: googleUserData.picture,
      googleId: googleUserData.id,
      email: googleUserData.email,
      locale: googleUserData.locale,
      role: dbUser.role,
    },
  };
  return event;
};
export const createCreateUserEvent = (googleUserData: GoogleUser) => {
  const event = {
    id: randomUUID(),
    name: 'USER_CREATED',
    version: 1,
    causationId: '',
    timestamp: new Date().toISOString(),
    payload: {
      id: randomUUID(),
      googleId: googleUserData.id,
      email: googleUserData.email,
      image: googleUserData.picture,
      name: getGoogleUserName(googleUserData),
      locale: googleUserData.locale,
      role: 'USER',
    },
  };
  return event;
};
