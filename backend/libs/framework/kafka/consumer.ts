import { Consumer, type EachMessagePayload, Kafka } from "kafkajs";

export class KafkaConsumer {
  private client: Kafka;
  private consumer: Consumer;
  constructor() {
    this.client = new Kafka({
      clientId: "AUTH-EVENTS-SERVICE",
      brokers: ["localhost:9092"],
    });
    this.consumer = this.client.consumer({ groupId: "notification-group" });

    this.consumer.connect();
  }
  async connect() {
    await this.consumer.connect();
  }
  async subscribe(topic: string, handler: (args: unknown) => Promise<void>) {
    await this.consumer.subscribe({ topic });
    await this.consumer.run({
      eachMessage: handler,
      autoCommit: true,
    });
    // in each handle message call. auto commit shoul ressolve
    // await consumer.commitOffsets([{ topic, partition, offset: message.offset }]);
  }

  disconnect() {
    this.consumer.disconnect();
  }
}
