const Router = require('koa-router');
const ctrl = require('../controllers');

const router = new Router();

const authAdmin = require('../middleware/authAdmin');

router.post('/user/login', ctrl.user.login);
router.post('/user/register', ctrl.user.register);
router.get('/public', ctrl.user.publicRoute);
router.get('/private', authAdmin, ctrl.user.privateRoute);

module.exports = router.routes();
