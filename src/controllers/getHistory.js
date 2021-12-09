const db = require('../db/models');

const getHistory = async (ctx) => {
  ctx.body = {
    success: true,
    message: 'Success',
    data: await db.History.findAll({
      atributes: ['id', 'videoId'],
      where: {
        userId: ctx.request.query.userId,
      },
      limit: ctx.request.query.limit,
    }),
  };
};

module.exports = getHistory;
