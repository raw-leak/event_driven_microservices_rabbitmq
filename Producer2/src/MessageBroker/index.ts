// import amqp from 'amqplib/callback_api';
import amqp = require('amqplib');

export class MessageBroker {
  /**
   * Initialize connection to rabbitMQ
   */

  private url;
  private listQueue;
  private connection;
  private channel;

  constructor() {
    this.url =
      'amqp://udmpnnyo:LihuSCm0FPZbli2Z0SJAug8oCgIGg1Hc@spider.rmq.cloudamqp.com/udmpnnyo';
    this.listQueue = 'todo-list-queue';

    this.init();
  }

  /**
   * Initialize connection to rabbitMQ
   */
  async init() {
    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();
  }

  async send(body) {
    await this.channel.assertQueue(this.listQueue, { durable: true });
    return true;
  }
}
