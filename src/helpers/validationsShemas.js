const Joi = require('joi');

const createHistory = Joi.object({
  userId: Joi.number().integer().required(),
  videoId: Joi.number().integer().required()
});
const getHistory = Joi.object({
  userId: Joi.number().integer().required(),
});

module.exports = {
  createHistory,
  getHistory
};
