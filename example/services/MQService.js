#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const CONN_URL = "amqp://udmpnnyo:LihuSCm0FPZbli2Z0SJAug8oCgIGg1Hc@spider.rmq.cloudamqp.com/udmpnnyo"

let ch = null;

amqp.connect(CONN_URL, function (err, conn) {

    conn.createChannel(function (err, channel) {
        ch = channel;
    });

});

 const publishToQueue = async (queueName, data) => {
    ch.sendToQueue(queueName, new Buffer(data));
}

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});
