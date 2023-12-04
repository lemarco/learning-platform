import loggerConstructor from 'pino';
export const logger = loggerConstructor({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
