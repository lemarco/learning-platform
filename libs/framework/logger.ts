import loggerConstructor, { Logger as L } from 'pino';

export const logger = loggerConstructor({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
export type Logger = typeof logger;
