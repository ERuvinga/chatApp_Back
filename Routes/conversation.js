const express = require('express');
const router = express.Router();
const ConversationCtrl = require('../Controller/conversation');
const Auth = require('../Middleware/Auth');

//Conversations Controllers
router.post('/', Auth, ConversationCtrl.NewConversation);
router.post('/:id', Auth, ConversationCtrl.getOneConversation);
router.post('/newConversation', Auth, ConversationCtrl.NewConversation);
router.post('/newMessage', Auth, ConversationCtrl.AddNewMessage);

module.exports = router;