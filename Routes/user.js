
const express = require("express");
const router = express.Router();
const UsersCtrl = require('../Controller/users');
const TokenCtrl = require('../Controller/Auth')

router.post('/', TokenCtrl);
router.post('/login', UsersCtrl.login);
router.post('/register', UsersCtrl.register);

module.exports = router; 