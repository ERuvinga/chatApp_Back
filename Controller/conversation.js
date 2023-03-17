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
                    _idConv: conversation._id,
                    messages: conversation.messages
                });
            }
        }
        )
        .catch(error => console.log(error));


};

// New message 
exports.AddNewMessage = (req, res) => {
    const idConversation = req.params.id;
    const NewMessages = {
        message: req.body.dataOfMessage.messages.message,
        type: req.body.dataOfMessage.messages.type,
        Hour: req.body.dataOfMessage.messages.hour,
        senderId: req.auth.UserId,
    }

    modelConversation.updateOne({ _id: idConversation }, { $push: { messages: NewMessages } })
        .then(() => console.log(`New message of ${idConversation}`))
        .catch(error => console.log(error));
};

// search One conversation
exports.getOneConversation = (req, res) => {

};

// search AllEndConversation
exports.getEndsMessages = (req, res) => {
};

