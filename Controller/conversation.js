const modelConversation = require('../Models/conversation');

//add New Conversation
exports.NewConversation = (req, res) => {
    _idFirstMember = req.auth.UserId;
    _idSecondMeber = req.body._idOtherUser;

    //check if this conversation are available
    modelConversation.findOne({ $or: [{ $and: [{ "members.0": _idFirstMember }, { "members.1": _idSecondMeber }] }, { $and: [{ "members.0": _idSecondMeber }, { "members.1": _idFirstMember }] }] })
        .then(conversation => {
            if (conversation === null) { //if notFund conversation, create new
                const Conversat = new modelConversation({
                    members: [
                        req.auth.UserId,
                        req.body._idOtherUser
                    ]
                })

                // New conversation
                Conversat.save()
                    .then(NewConversation => {
                        res.status(200);
                        res.json({ _idConvesation: NewConversation._id });
                        console.log("New conversation created");
                    })
                    .catch(error => console.log(error))

            }
            else {
                res.status(200);
                res.json({
                    _idCoversation: conversation._id,
                    messages: conversation.messages
                });
            }
        }
        )
        .catch(error => console.log(error));


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

