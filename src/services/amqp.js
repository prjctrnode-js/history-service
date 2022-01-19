const amqp = require('amqplib');
const db = require('../db/models');
const updateOrCreate = require('../helpers/updateOrCreate');

const EXCHANGE_NAME = 'history';
const QUEUE_NAME = 'histor';

class AMQP {
  async connect() {
    const connection = await amqp.connect('amqp://localhost');
    console.log('rabbit connected');

    const channel = await connection.createChannel();
    console.log('channel opened');

    const historyQueue = await channel.assertQueue(QUEUE_NAME);
    console.log('queue asserted');

    channel.bindQueue(historyQueue.queue, EXCHANGE_NAME, 'history');

    await channel.consume(
      QUEUE_NAME,
      async (message) => {
        const { videoId, userId } = JSON.parse(message.content);
        await updateOrCreate(
          db.History,
          { videoId, userId },
          {
            videoId,
            userId,
          }
        );
      },
      { noAck: true }
    );

    this.channel = channel;
  }
}

let amqpInstance;

(async () => {
  amqpInstance = new AMQP();
  await amqpInstance.connect();
})();

module.exports = amqpInstance;
