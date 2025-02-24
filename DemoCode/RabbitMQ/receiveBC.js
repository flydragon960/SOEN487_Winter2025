const amqp = require('amqplib');

async function receiveMessage() {
    const connection = await amqp.connect('amqp://127.0.0.1');
    const channel = await connection.createChannel();


    //await channel.assertQueue(queue, { durable: false });

    await channel.assertExchange('logs', 'fanout', { durable: false });
    const q = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(q.queue, 'logs', '');


    console.log(" [*] Waiting for messages. To exit, press CTRL+C");

    channel.consume(q.queue, (msg) => {
        console.log(` [x] Received: ${msg.content.toString()}`);
    }, { noAck: true });
}

receiveMessage().catch(console.error);
