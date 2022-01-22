const logger = require('../helpers/logger');
const db = require('../db/models');
const updateOrCreate = require('../helpers/updateOrCreate');

const EXCHANGE_NAME = 'history';
const QUEUE_NAME = 'history';

const amqpHistoryWorker = async (channel) => {
  const historyQueue = await channel.assertQueue(QUEUE_NAME);
  logger.log({
    message: 'rabbitmq queue asserted',
    level: 'info',
  });
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
};

module.exports = amqpHistoryWorker;
