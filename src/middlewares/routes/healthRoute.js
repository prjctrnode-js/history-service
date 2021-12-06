const Router = require('@koa/router');
const router = new Router();
const pJson = require('../../../package.json');

router.get('/history/health', async (ctx) => {
  ctx.set({ 'Content-Type': 'application/json' });
  ctx.body = JSON.stringify({
    success: true,
    message: `Name ${pJson.name}, version ${pJson.version}`,
  });
});

module.exports = router;
