import amqp = require('amqplib');
import config from 'config';

export class MessageBroker {

  private url: string;
  private exchange: string;
  private todoListKey: string;
  private connection;
  private channel;

  constructor() {
    this.url =
      'amqp://udmpnnyo:LihuSCm0FPZbli2Z0SJAug8oCgIGg1Hc@spider.rmq.cloudamqp.com/udmpnnyo';
    this.exchange = config.get('mb.todo-list-exchange');
    this.todoListKey = config.get('mb.todo-list-create-key');

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
   * Send message to queue by key to create a new Todo List on creating a new user
   *
   * @param {Object} msg Message as Object
   */
  createNewTodoListByDefault = (msg) => {
    const bufferedMsg = Buffer.from(JSON.stringify(msg));

    this.channel.assertExchange(this.exchange, 'direct', { durable: false});

    this.channel.publish(this.exchange, this.todoListKey, bufferedMsg);  

    console.log(" [x] Sent %s", msg);

    return true
  }
}
