const Router = require('@koa/router');

const router = new Router();
const getHistory = require('../../controllers/getHistory')
const createHistory = require('../../controllers/createHistory')

router.get('/history', getHistory);
router.post('/history', createHistory);

module.exports = router;
