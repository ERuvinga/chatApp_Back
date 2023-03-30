const express = require('express');
const router = express.Router();
const ConversationCtrl = require('../Controller/conversation');
const Auth = require('../Middleware/Auth');

//Conversations Controllers
router.post('/', Auth, ConversationCtrl.NewConversation, ConversationCtrl.LastMessage);
router.put('/NewMessage/:idConversat', Auth, ConversationCtrl.AddNewMessage);

module.exports = router;