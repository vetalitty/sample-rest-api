const Router = require('koa-router');

const router = new Router();
const api = new Router();

api.use(require('./user'));

router.use('/v1', api.routes());

module.exports = router;
