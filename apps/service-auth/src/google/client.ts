import { google } from 'googleapis';

import { getEnv } from '@learning-platform-monorepo/env';

export const oauth2ClientGoogle = new google.auth.OAuth2({
  clientId: getEnv('GOOGLE_CLIENT_ID'),
  clientSecret: getEnv('GOOGLE_CLIENT_SECRET'),
  redirectUri: getEnv('OAUTH_REDIRECT_URL'),
});
