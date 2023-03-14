const modelConversation = require('../Models/conversation');
//add New message 
exports.AddNewMessage = (req, res) => {
    const Conversat = new modelConversation({
        members: {
            SenderId: req.auth.UserId,
            OtherUser: req.body.dataOfMessage.members.otherUser,
        },

        messages: {
            message: req.body.dataOfMessage.messages.message,
            type: req.body.dataOfMessage.messages.type,
        }
    })

    Conversat.save()
        .then(Conversation => console.log(Conversation))
        .catch(error => console.log(error))
};

// search One conversation
exports.getOneConversation = (req, res) => {

};

// search AllEndConversation
exports.getEndsMessages = (req, res) => {
};

