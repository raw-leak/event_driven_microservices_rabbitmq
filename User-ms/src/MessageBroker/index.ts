// import amqp from 'amqplib/callback_api';
import amqp = require('amqplib');

export class MessageBroker {
  /**
   * Initialize connection to rabbitMQ
   */

  private url;
  private walletCreateQueue;
  private walletAddQueue;
  private connection;
  private channel;
  private queues: object;

  constructor() {
    this.url =
      'amqp://udmpnnyo:LihuSCm0FPZbli2Z0SJAug8oCgIGg1Hc@spider.rmq.cloudamqp.com/udmpnnyo';
    this.walletCreateQueue = 'wallet-create-queue';
    this.walletAddQueue = 'wallet-add-queue';
    this.queues = {};

    this.init();
  }

  /**
   * Initialize connection to rabbitMQ
   */
  init = async () => {
    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();
  };

  /**
   * Send message to queue to create a new wallet on creating a new user
   *
   * @param {Object} msg Message as Object
   */
  async createNewTodoListByDefault(msg) {
    const bufferedMsg = Buffer.from(JSON.stringify(msg));

    // const queue = this.walletCreateQueue;
    const exchange  = 'wallet'
    const key  = 'new1'

    this.channel.assertExchange(exchange, 'direct', { durable: false});

    this.channel.publish(exchange, key, bufferedMsg);  
    console.log(" [x] Sent %s", msg);

    return true
  }

  async addToWalletAmout({ userId, amount }) {
   
  }
}
