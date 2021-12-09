const combineRouters = require('koa-combine-routers');
const healthRoute = require('./healthRoute');
const historyRoute = require('./historyRoute');

const router = combineRouters(healthRoute, historyRoute);

module.exports = router;
