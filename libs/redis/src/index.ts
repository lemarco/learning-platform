import { logger } from '@learning-platform-monorepo/logger';
import { Redis } from 'ioredis';

type Instance = { redis?: Redis };
const instance: Instance = {
  redis: undefined,
};

export const connectRedis = ({
  host,
  port,
}: {
  host: string;
  port: number;
}) => {
  // TODO: implement verification connection and retry logic.
  instance.redis = new Redis({
    host,
    port,
  });
  instance.redis.on('error', (e) => {
    throw new Error(`Redis connection failed: ${e}`);
  });
  logger.info('Connect Redis success');
};

export const disconnectRedis = () => {
  instance.redis.disconnect();
  logger.info('Disconnect Redis success');
};
export const getRecord = async (
  prefix: string,
  key: string
): Promise<string | null> => {
  return await instance.redis.get(`${prefix}:${key}`);
};

export const setRecord = async (
  prefix: string,
  key: string,
  value: string
): Promise<void> => {
  await instance.redis.set(`${prefix}:${key}`, value);
};

export const setWithExpiry = async (
  prefix: string,
  key: string,
  value: string,
  expiry: number
): Promise<void> => {
  await instance.redis.set(`${prefix}:${key}`, value, 'EX', expiry);
};

export const deleteRecord = async (
  prefix: string,
  key: string
): Promise<void> => {
  await instance.redis.del(`${prefix}:${key}`);
};
