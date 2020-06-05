const amqp = require('amqplib/callback_api');
const CONN_URL =
  'amqp://udmpnnyo:LihuSCm0FPZbli2Z0SJAug8oCgIGg1Hc@spider.rmq.cloudamqp.com/udmpnnyo';

class MessageBroker {
  queue = 'user-message';
  channel;

  async connect() {
    this.connection = await amqp.connect(
      process.env.RABBITMQ_URL || 'amqp://localhost'
    );
    this.channel = await this.connection.createChannel();
  }
}

class MessageBroker {
  /**
   * Initialize connection to rabbitMQ
   */
  async init() {
    this.connection = await amqp.connect(
      process.env.RABBITMQ_URL || 'amqp://localhost'
    );
    this.channel = await this.connection.createChannel();
  }
}

export default new App().app;
