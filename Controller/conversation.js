const modelConversation = require('../Models/conversation');
//add New message 
exports.AddNewMessage = (req, res) => {
    console.log(req.body);
    const Conversat = new modelConversation({
        members: {
            SenderId: req.auth.UserId,
            OtherUser: req.body.dataOfMessage.members.otherUser,
        },

        messages: {
            ...req.body.dataOfMessage.messages
        }
    })

    Conversat.save()
        .then()
        .catch(error => console.log(error))
};

// search One conversation
exports.getOneConversation = (req, res) => {

};

// search AllEndConversation
exports.getEndsMessages = (req, res) => {
};

