const Router = require('@koa/router');
const historyHealth = require('../../controllers/historyHealth')

const router = new Router();

router.get('/history/health', historyHealth);

module.exports = router;
