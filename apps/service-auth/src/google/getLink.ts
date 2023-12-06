import { oauth2ClientGoogle } from './client';
const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];
export const generateAuthUrl = async (): Promise<{ link: string }> => {
  const link = await oauth2ClientGoogle.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });

  return { link };
};
