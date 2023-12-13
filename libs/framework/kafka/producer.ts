import { Producer, Kafka } from 'kafkajs';

export class KafkaProducer {
  private client: Kafka;
  private producer: Producer;
  constructor() {
    this.client = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092', 'localhost:9092'],
    });
    this.producer = this.client.producer();
  }
  produceMessage(topic: string, message: string) {
    // Produce message to the specified topic
    //    this.producer.send(topic, null, Buffer.from(message), null, Date.now());
  }

  disconnect() {
    // Disconnect the producer from the Kafka broker
    this.producer.disconnect();
  }
}
