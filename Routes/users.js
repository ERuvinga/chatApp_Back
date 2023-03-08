const Express = require('express');
const router = Express.Router();
const UsersCtrl = require('../Controller/users');

//UserRoutes
router.get('/:userId', UsersCtrl.getOneUser);
router.get('/', UsersCtrl.getAllUsers);

module.exports = router;