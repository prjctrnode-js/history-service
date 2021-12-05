const Router = require('@koa/router');
const router = new Router();
const pJson = require('../../../package.json');
const db = require('../../db/models');
const updateOrCreate = require('../../helpers/updateOrCreate');

router.get('/history/health', async (ctx) => {
  ctx.set({ 'Content-Type': 'application/json' });
  ctx.body = JSON.stringify({
    success: true,
    message: `Name ${pJson.name}, version ${pJson.version}`,
  });
});

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
    { videoId: videoId },
    {
      videoId,
      userId,
    }
  );
});

module.exports = router;
