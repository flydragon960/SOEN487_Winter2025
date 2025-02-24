const amqp = require('amqplib');

async function receiveMessage() {
    const connection = await amqp.connect('amqp://127.0.0.1');
    const channel = await connection.createChannel();
    const queue = 'hello';

    await channel.assertQueue(queue, { durable: false });

    console.log(" [*] Waiting for messages. To exit, press CTRL+C");

    channel.consume(queue, (msg) => {
        console.log(` [x] Received: ${msg.content.toString()}`);
    }, { noAck: true });
}

receiveMessage().catch(console.error);
