const amqp = require('amqplib/callback_api');
const CONN_URL =
  'amqp://udmpnnyo:LihuSCm0FPZbli2Z0SJAug8oCgIGg1Hc@spider.rmq.cloudamqp.com/udmpnnyo';

amqp.connect(CONN_URL, (err, conn) => {
  debugger;
  conn.createChannel(function (err, ch) {
    debugger;
    ch.consume(
      'user-messages',
      (msg) => {
        debugger;
        console.log('.....');
        console.log('Message:', msg.content.toString());
      },
      { noAck: true }
    );
  });
});
