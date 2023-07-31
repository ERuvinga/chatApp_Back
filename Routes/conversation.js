const express = require('express');
const router = express.Router();
const ConversationCtrl = require('../Controller/conversation');
const Auth = require('../Middleware/Auth');

//Conversations Controllers
router.post('/', Auth, ConversationCtrl.NewConversation, ConversationCtrl.resetUnReadMsg);
router.put('/NewMessage/:idConversat', Auth, ConversationCtrl.AddNewMessage, ConversationCtrl.LastMessage);

module.exports = router;