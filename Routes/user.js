
const express = require("express");
const router = express.Router();
const UsersCtrl = require('../Controller/users');

router.post('/login', UsersCtrl.login);
router.post('/register', UsersCtrl.register);

module.exports = router; 