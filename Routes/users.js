const Express = require('express');
const router = Express.Router();
const UsersCtrl = require('../Controller/users');
const Auth = require('../Middleware/Auth')

//UserRoutes
router.get('/:userId', Auth, UsersCtrl.getOneUser);
router.get('/', Auth, UsersCtrl.getAllUsers);

module.exports = router;