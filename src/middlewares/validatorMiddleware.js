const Joi = require('joi');
const logger = require('../helpers/logger');
const schema = Joi.object({
  userId: Joi.number().integer(),
  videoId: Joi.number().integer(),
});

const validatorMiddleware = async (ctx, next) => {
  try {
    await schema.validateAsync({
      videoId: ctx.request.query.videoId,
      userId: ctx.request.query.userId,
    });
    await next();
  } catch (err) {
    logger.log({
      message: err,
      level: 'info',
    });
    ctx.throw(400, { error: err });
  }
};

module.exports = validatorMiddleware;
