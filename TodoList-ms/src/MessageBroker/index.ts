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
   * Send message to queue
   * @param {String} queue Queue name
   * @param {Object} msg Message as Buffer
   */
  async send(queue, msg) {
    if (!this.connection) await this.init();

    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, msg);
  }

  /**
   * @param {String} queue Queue name
   * @param {Function} handler Handler that will be invoked with given message and acknowledge function (msg, ack)
   */
  async subscribe(key, handler) {
    if (!this.connection) await this.init();
    debugger

    const queues = await this.channel.assertQueue('', {
      exclusive: true
    });

    const queue = queues.queue

    console.log()
    if (this.queues[queue]) {
      const existingHandler = _.find(this.queues[queue], (h) => {
        if (h === handler) return h;
      });

      if (existingHandler) {
        return () => this.unsubscribe(queue, existingHandler);
      }

      this.queues[queue].push(handler);
      return () => this.unsubscribe(queue, handler);
    }
    debugger
    await this.channel.assertExchange(this.exchanger , 'direct', {
      durable: false
    });
    debugger

    if(this.queues[key]){
      this.queues[key].push(handler) 
    } else {
      this.queues[key] = [handler]
    }
    debugger
    this.channel.bindQueue(queue, this.exchanger , key);

    this.channel.consume(queue, async (msg) => {
      debugger
      console.log(msg)

      const { fields: { routingKey, consumerTag }, content } = msg
      debugger
      const ack = () => this.channel.ack(msg);
      debugger

   


      this.queues[routingKey].forEach((h) => {
        return h(msg, ack);
      });
      
      debugger

    });

    return () => this.unsubscribe(queue, handler);
  }

  async unsubscribe(queue, handler) {
    _.pull(this.queues[queue], handler);
  }
}

export const startBroker = async () => {
  if (!instance) {
    const broker = new MessageBroker();
    instance = broker.init();
  }
  return instance;
};
