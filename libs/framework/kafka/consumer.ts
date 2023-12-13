import { Consumer, Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka1:9092', 'kafka2:9092'],
});

const producer = kafka.producer();
class KafkaConsumer {
  private client: Kafka;
  private consumer: Consumer;
  constructor() {
    this.client = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092', 'localhost:9092'],
    });
    this.consumer = this.client.consumer({ groupId: 'test-group' });
    // new Consumer(
    //   {
    //     'group.id': 'your_consumer_group', // Replace with your consumer group
    //     'metadata.broker.list': 'kafka-broker-1:9092,kafka-broker-2:9092', // Replace with your actual broker addresses
    //   },
    //   {}

    // this.consumer.on('ready', () => {
    //   console.log('Kafka consumer is ready.');
    //   this.consumer.subscribe(['your_topic']); // Replace with your actual topic
    // });

    // this.consumer.on('data', (message) => {
    //   console.log('Received message:', message.value?.toString());
    // });
    // this.consumer.on('event.error', (err) => {
    //   console.error('Error from consumer:', err);
    // });

    // Connect the consumer to the Kafka broker
    this.consumer.connect();
  }

  disconnect() {
    // Disconnect the consumer from the Kafka broker
    this.consumer.disconnect();
  }
}

// Example usage:
const kafkaConsumer = new KafkaConsumer();

// Handle graceful shutdown
process.on('SIGINT', () => {
  kafkaConsumer.disconnect();
  process.exit();
});
