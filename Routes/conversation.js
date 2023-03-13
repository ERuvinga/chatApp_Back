const express = require('express');
const router = express.Router();
const ConversationCtrl = require('../Controller/conversation');

//Conversations Controllers
router.post('/', ConversationCtrl.getEndsMessages);
router.post('/:id', ConversationCtrl.getOneConversation);

module.exports = router;