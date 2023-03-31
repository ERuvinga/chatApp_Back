
const express = require("express");
const router = express.Router();
const AuthCtrl = require('../Controller/Auth');

//Authentifications Controllers
router.post('/', AuthCtrl.CheckAuthentiqUser);
router.post('/login', AuthCtrl.login);
router.post('/register', AuthCtrl.register, AuthCtrl.LastMessage);

module.exports = router; 