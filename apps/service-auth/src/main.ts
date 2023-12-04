// import jwt from 'jsonwebtoken';
import { createEnvStore, getEnv } from '@learning-platform-monorepo/env';

import {
  addExchangeAndQueue,
  closeEventBusConnection,
  createEventBusConnection,
  publish,
  subscribeToQueue,
} from '@learning-platform-monorepo/rabbit';
import { logger } from '@learning-platform-monorepo/logger';
import { Event } from '@learning-platform-monorepo/events';

// export class AuthController {
//   private readonly logger = new Logger(AuthController.name);
//   constructor(private readonly googleAuthService: GoogleAuthService) {}

//   @Get('/google-link')
//   async getGoogleLink() {
//     return await this.googleAuthService.getGoogleLink();
//   }
//   @Get('/signin/google')
//   async gooogleSignin(@Request() req, @Res() res, @Query('code') code: string) {
//     const { ip, userAgent } = req;
//     const { token, opts } = await this.googleAuthService.gooogleSignin({
//       ip,
//       userAgent,
//       code,
//     });
//     // this.logger.log(
//     //   'gooogleSignin',
//     //   JSON.stringify({ token, opts, id }, null, 4)
//     // );
//     res.cookie('htoken', token, opts);
//     res.status(302).redirect('/');
//   }
//   @Get('/logout')
//   async me(@Res() res) {
//     res.clearCookie('htoken');
//   }

const supportedEventNames = [
  'REQUEST_GOOGLE_LINK',
  'REQUEST_GOOGLE_SIGNIN',
  'REQUEST_LOGOUT',
];

const eventsTableQueueMatch = {
  AUTH: 'GW-AUTH',
};
const handler = async (event: Event<unknown>) => {
  logger.info(`Event - ${JSON.stringify(event)}`);
  await publish('AUTH-GW', event);
};
const bootstrap = async () => {
  createEnvStore(['RABBIT_URL', 'RABBITMQ_USER', 'RABBITMQ_PASSWORD']);
  logger.info('ENV reading success');
  await createEventBusConnection(getEnv('RABBIT_URL'));
  logger.info('Event bus connection success');
  await addExchangeAndQueue('GW-AUTH', 'GW-AUTH', false);
  logger.info('Event bus create/check GW-AUTH exchange and queue success');
  await addExchangeAndQueue('AUTH-GW', 'AUTH-GW', true);
  logger.info('Event bus create/check AUTH-GW exchange and queue success');
  await subscribeToQueue('GW-AUTH', (event) => handler(event));

  logger.info('Subscription to queue AUTH-GW success');
};
(async () => {
  await bootstrap();
  process.on('SIGTERM', async () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    await closeEventBusConnection();
  });
})();
