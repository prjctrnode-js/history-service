const combineRouters = require('koa-combine-routers');
const Router = require('@koa/router');
const historyHealth = require('../../controllers/historyHealth')
const getHistory = require('../../controllers/getHistory')
const createHistory = require('../../controllers/createHistory')

const healthRoute = new Router()
const historyRoute = new Router()

healthRoute.get('/history/health', historyHealth);
historyRoute.get('/history', getHistory);
historyRoute.post('/history', createHistory);

const router = combineRouters(healthRoute, historyRoute);

module.exports = router;
