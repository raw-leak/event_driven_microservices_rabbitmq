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
