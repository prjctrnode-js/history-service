const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
require('dotenv-defaults').config();
const errorHandler = require('./middlewares/errorHandler');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const logger = require('./helpers/logger');
const routes = require('./middlewares/routes/routes');
const amqpConnect = require('./services/amqp')

const app = new Koa();
app.use(loggerMiddleware);
app.use(bodyparser());
app.use(errorHandler());
app.use(routes());

app.listen(process.env.PORT, () => {
  amqpConnect()
  logger.log({
    message: `Server running at port ${process.env.PORT}`,
    level: 'info',
  });
});
