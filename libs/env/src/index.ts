import 'dotenv/config';
import { logger } from '@learning-platform-monorepo/logger';
const data: Record<string, string> = {};

export const createEnvStore = (names: string[]) => {
  if (!names.length || Object.keys(data).length) {
    return;
  }
  names.forEach((name: string) => {
    const variable = process.env[name];
    if (variable) {
      data[name] = variable;
    } else {
      throw new Error(`Variable must be defined ${name} in env file.`);
    }
  });
  logger.info('ENVS:' + JSON.stringify(data));
};

export const getEnv = (name: string) => {
  return data[name];
};
