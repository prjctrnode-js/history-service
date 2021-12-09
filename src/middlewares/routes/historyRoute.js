const Router = require('@koa/router');

const router = new Router();
const db = require('../../db/models');
const updateOrCreate = require('../../helpers/updateOrCreate');

router.get('/history', async (ctx) => {
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
});

router.post('/history', async (ctx) => {
  const { userId, videoId } = ctx.request.body;
  ctx.body = await updateOrCreate(
    db.History,
    { videoId },
    {
      videoId,
      userId,
    }
  );
});

module.exports = router;
