import { Event } from '@learning-platform-monorepo/events';
import { connect, Connection, Channel } from 'amqplib';
import { logger } from '@learning-platform-monorepo/logger';
type EventBus = {
  inConnection?: Connection;
  outConnection?: Connection;
  outChannel?: Channel;
  inChannel?: Channel;
  connectionString?: string;
};

const instance: EventBus = {
  connectionString: undefined,
  inConnection: undefined,
  outConnection: undefined,
  outChannel: undefined,
  inChannel: undefined,
};

export const createEventBusConnection = async (
  connectionString: string
): Promise<EventBus> => {
  try {
    if (!connectionString) {
      throw new Error('Connection string is not provided.');
    }
    instance.inConnection = await connect(connectionString);
    instance.outConnection = await connect(connectionString);
    instance.connectionString = connectionString;
  } catch (e: unknown) {
    throw new Error(
      `Error while connecticon to event bus.${JSON.stringify(e)}`
    );
  }
  return instance;
};
const reconnect = async (out: boolean) => {
  if (out) {
    if (!instance.outChannel) {
      if (!instance.outConnection) {
        instance.outConnection = await connect(instance.connectionString);
      }
      instance.outChannel = await instance.outConnection.createChannel();
    }
  } else {
    if (!instance.inChannel) {
      if (!instance.inConnection) {
        instance.inConnection = await connect(instance.connectionString);
      }
      instance.inChannel = await instance.inConnection.createChannel();
    }
  }
};

const getChannel = async (publish: boolean) => {
  const channel = publish ? instance.outChannel : instance.inChannel;
  if (!channel) {
    await reconnect(publish);
    return publish ? instance.outChannel : instance.inChannel;
  }
  return channel;
};

export const publish = async (
  exchangeName: string,
  message: Event<unknown>
) => {
  const channel = await getChannel(true);
  await channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
};

export const addExchange = async (name: string, publish: boolean) => {
  const channel = await getChannel(publish);
  await channel?.assertExchange(name, 'fanout', {
    durable: true,
  });
};
export const addQueue = async (name: string, publish: boolean) => {
  const channel = await getChannel(publish);

  await channel?.assertQueue(name, {
    durable: true,
  });
};
export const addExchangeAndQueue = async (
  exchange: string,
  queue: string,
  publish: boolean
) => {
  const args = { durable: true };
  try {
    logger.info(`Adding Exchange ${exchange} and queue: ${queue}`);
    const channel = await getChannel(publish);
    logger.info(`Channel get success`);
    await channel.assertExchange(exchange, 'fanout', args);
    logger.info(`assertExchange success`);
    await channel.assertQueue(queue, args);
    logger.info(`assertQueue success`);
    await channel.bindQueue(queue, exchange, '');
    logger.info(`bindQueue success`);
  } catch (e) {
    logger.error('While adding Exchange And Queue', e);
  }
};

export const closeEventBusConnection = async (): Promise<void> => {
  if (instance.outConnection) {
    await instance.outConnection.close();
    console.log('Out connection closed');
  }
  if (instance.inConnection) {
    await instance.inConnection.close();
    console.log('In connection closed');
  }
};
export const subscribeToQueue = async (
  queueName: string,
  handleMessage: (event: Event<unknown>) => void
): Promise<void> => {
  const channel = await getChannel(false);

  await channel.consume(
    queueName,
    (msg) => {
      if (msg !== null) {
        console.log(` [x] Received ${msg.content.toString()}`);
        console.log(' [x] Done');
        handleMessage(JSON.parse(msg.content.toString()));
        channel.ack(msg);
      }
    },
    {}
  );
};
