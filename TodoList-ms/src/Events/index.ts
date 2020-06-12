import amqp from 'amqplib';
import _ from 'lodash';

/**
 * @var {Promise<MessageBroker>}
 */
let instance;

/**
 * Broker for async messaging
 */
class MessageBroker {
  private queues: object;
  private connection;
  private channel;
  private exchanger;

  /**
   * Trigger init connection method
   */
  constructor() {
    this.queues = {};
  }

  /**
   * Initialize connection to rabbitMQ
   */
  async init() {
    this.connection = await amqp.connect(
      'amqp://udmpnnyo:LihuSCm0FPZbli2Z0SJAug8oCgIGg1Hc@spider.rmq.cloudamqp.com/udmpnnyo'
    );
    this.channel = await this.connection.createChannel();
    this.exchanger = "wallet";

    return this;
  }

  /**
   * @param {String} Key Key name
   * @param {Function} handler Handler that will be invoked with given message and acknowledge function (msg, ack)
   */
  async subscribe(key, handler) {
    if (!this.connection) await this.init();

    if (this.queues[key]) {
      const existingHandler = _.find(this.queues[key], (h) => h === handler );

      if (existingHandler) return () => this.remove(key, existingHandler);
      
      this.queues[key].push(handler);

      return () => this.remove(key, handler);
    }
    
    // connect to exchanger
    await this.channel.assertExchange(this.exchanger, 'direct', { durable: false });
    
    if (this.queues[key]) this.queues[key].push(handler) 
    else this.queues[key] = [handler]

    // look for and exclusive queue (doesn't matter the name, it's totaly random)
    const { queue } = await this.channel.assertQueue('', { exclusive: true });

    // bind queue with exchanger
    this.channel.bindQueue(queue, this.exchanger , key);

    // start consuming the exclusive queue
    this.channel.consume(queue, async (msg) => {
      
      const { fields: { routingKey, consumerTag }, content } = msg
      
      const ack = () => this.channel.ack(msg);

      this.queues[routingKey].forEach((h) => h(msg, ack));
      
    });

    return () => this.remove(key, handler);
  }

  async remove(key, handler) {
    this.queues[key].pull()

    _.pull(this.queues[key], handler);
  }
}

export const startBroker = async () => {
  if (!instance) {
    const broker = new MessageBroker();
    instance = broker.init();
  }
  return instance;
};
