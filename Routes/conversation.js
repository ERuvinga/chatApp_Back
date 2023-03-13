const express = require('express');
const router = express.Router();
const ConversationCtrl = require('../Controller/conversation');
const Auth = require('../Middleware/Auth');

//Conversations Controllers
router.post('/', Auth, ConversationCtrl.getEndsMessages);
router.post('/news', Auth, ConversationCtrl.AddNewMessage);
router.post('/:id', Auth, ConversationCtrl.getOneConversation);

module.exports = router;