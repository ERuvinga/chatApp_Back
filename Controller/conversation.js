const modelConversation = require('../Models/conversation');

//add New Conversation
exports.NewConversation = (req, res) => {
    _idFirstMember = req.auth.UserId;
    _idSecondMeber = req.body._idOtherUser;

    //check if this conversation are available
    modelConversation.findOne({ $or: [{ $and: [{ "members.0": _idFirstMember }, { "members.1": _idSecondMeber }] }, { $and: [{ "members.0": _idSecondMeber }, { "members.1": _idFirstMember }] }] })
        .then(conversation => {
            console.log(conversation)
        }
        )
        .catch(error => console.log(error));

    //     const Conversat = new modelConversation({

    //         members: [
    //             req.auth.UserId,
    //             req.body._idOtherUser
    //         ]
    //     })

    //     Conversat.save()
    //         .then(Conversation => console.log(Conversation))
    //         .catch(error => console.log(error))
    //
};

// New message 
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

