#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const CONN_URL = "amqp://udmpnnyo:LihuSCm0FPZbli2Z0SJAug8oCgIGg1Hc@spider.rmq.cloudamqp.com/udmpnnyo"
debugger
let ch = null;

amqp.connect(CONN_URL, function (err, conn) {
    debugger
    conn.createChannel(function (err, channel) {
        ch = channel;
    });

});

module.exports = publishToQueue = async (queueName, data) => ch.sendToQueue(queueName, Buffer.from(data));


process.on('exit', (code) => {
    debugger
    ch.close();
    console.log(`Closing rabbitmq channel`);
});
