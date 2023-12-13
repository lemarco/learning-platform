import { Redis as R } from 'ioredis';
import { Logger } from './logger';

type RedisArgs = {
  host: string;
  port: number;
  logger: Logger;
};
export class Redis {
  private instance: R;
  private logger: Logger;
  constructor({ host, port, logger }: RedisArgs) {
    this.instance = new R({ host, port });
    this.logger = logger;
    this.instance.on('error', (e) => {
      throw new Error(`Redis connection failed: ${e}`);
    });
    logger.info('Connect Redis success');
  }
  disconnect() {
    this.instance?.disconnect();
    this.logger.info('Disconnect Redis success');
  }
  async get(prefix: string, key: string): Promise<string | null> {
    return await this.instance.get(`${prefix}:${key}`);
  }
  async set(prefix: string, key: string, value: string): Promise<void> {
    await this.instance.set(`${prefix}:${key}`, value);
  }
  async setWithExpiry(
    prefix: string,
    key: string,
    value: string,
    expiry: number
  ): Promise<void> {
    await this.instance.setex(`${prefix}:${key}`, expiry, value);
  }
  async deleteRecord(prefix: string, key: string) {
    await this.instance.del(`${prefix}:${key}`);
  }
}
