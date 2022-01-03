const Router = require('@koa/router');
const getHistory = require('../../controllers/getHistory');
const createHistory = require('../../controllers/createHistory');
const validatorMiddleware = require('../validatorMiddleware');
const isAuth = require('../isAuth')
const isAuthInside = require('../isAuthInside')

const historyRoute = new Router();
historyRoute.get(
  '/history',isAuth,
  validatorMiddleware('getHistory', (ctx) => ({
    userId: ctx.request.query.userId,
  })),
  async (ctx) => {
    const { userId } = ctx.request.query;
    const { limit } = ctx.request.query;
    const { status, body } = await getHistory(userId, limit);
    ctx.status = status;
    ctx.body = body;
  }
);
historyRoute.post(
  '/history', isAuthInside,
  validatorMiddleware('createHistory', (ctx) => ctx.request.body),
  async (ctx) => {
    const { userId, videoId } = ctx.request.body;
    const { status, body } = await createHistory(userId, videoId);
    ctx.status = status;
    ctx.body = body;
  }
);
module.exports = historyRoute;
