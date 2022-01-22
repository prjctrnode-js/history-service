const amqp = require('amqplib');
const logger = require('../helpers/logger')
const amqpHistoryWorker = require('./worker.createHistory')

const CONNECTION_URL = 'amqp://localhost';

const amqpConnect = async ()=> {
  try {
    const connection = await amqp.connect(CONNECTION_URL);
    logger.log({
      message: 'rabbitmq connected',
      level: 'info'
    });
    const channel = await connection.createChannel();
    logger.log({
      message: 'rabbitmq channel opened',
      level: 'info'
    });
    process.on('exit', () => {
      channel.close();
      logger.log({
        message: 'Closing rabbitmq channel',
        level: 'info'
      });
    });
    amqpHistoryWorker(channel)
  } catch (error) {
    logger.log({
      message: error.message,
      level: 'info'
    });
  }
}

module.exports = amqpConnect;
