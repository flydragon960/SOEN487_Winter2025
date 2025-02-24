const amqp = require('amqplib');

async function sendMessage() {
    const connection = await amqp.connect('amqp://127.0.0.1');
    const channel = await connection.createChannel();
    const queue = 'hello';

    await channel.assertQueue(queue, { durable: false });

    const message = 'Hello, RabbitMQ!';
    channel.sendToQueue(queue, Buffer.from(message));

    console.log(` [x] Sent: ${message}`);

    setTimeout(() => {
        connection.close();
    }, 500);
}

sendMessage().catch(console.error);
