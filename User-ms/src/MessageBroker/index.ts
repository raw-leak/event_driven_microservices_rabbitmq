import amqp = require('amqplib');
import config from 'config';

export class MessageBroker {

  private url: string;
  private exchange: string;
  private todoListKey: string;
  private connection;
  private channel;

  constructor() {
    this.url = config.get('broker.urlConnection');
    this.exchange = config.get('broker.todo-list-exchange');
    this.todoListKey = config.get('broker.todo-list-create-key');

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
