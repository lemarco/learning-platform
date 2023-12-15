import { EachMessagePayload } from 'kafkajs';
import { migrator, Event, KafkaConsumer } from 'framework';
import { resolve } from 'path';

const migrationsFolder = resolve('./migrations');
await migrator(process.env.AUTH_READ_DB_URL || '', migrationsFolder);

const handleMessage = async ({
  message,
}: EachMessagePayload): Promise<void> => {
  if (message.value) {
    const messageParsed = JSON.parse(
      message.value?.toString()
    ) as Event<unknown>;
  }
};
const consumer = new KafkaConsumer();
await consumer.connect();
await consumer.subscribe('', handleMessage);
