import amqplib from "amqplib";

const QUEUE = "tasks";
let usersLog = [];
let channel = null;

(async () => {
    try {
        const connection = await amqplib.connect("amqps://hnrqckmd:ftvzVDT-i3Zg2eCzwnl3ctPKIvb5CP4U@prawn.rmq.cloudamqp.com/hnrqckmd");
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE, {
            durable: true
        });

        channel.consume(QUEUE, message => {
            if (message !== null) {
                const content = message.content.toString();
                usersLog.push(content);
                channel.ack(message);
            }
        });
    }
    catch (error) {
        console.log("Error", error);
    }
})();

export function getLog() {
    return usersLog;
};