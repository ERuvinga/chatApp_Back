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
                        res.json({ _idConvesation: NewConversation._id, messages: NewConversation.messages });
                        console.log(`New conversation created: ${NewConversation._id}`);
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
        .catch(error => {
            console.log(error)
            res.status(401);
            res.json({ error });
        });


};

// New message 
exports.AddNewMessage = (req, res) => {
    console.log(req.params.idConversat);
    const NewMessages = {
        message: req.body.dataOfMessage.messages.message,
        type: req.body.dataOfMessage.messages.type,
        Hour: req.body.dataOfMessage.messages.hour,
        senderId: req.auth.UserId,
        LastMsgInConver: true,
    }

    modelConversation.find({ _id: req.params.idConversat })
        .then(data => {
            console.log(data.messages)
            //checking if conversation content messages and if SenderUser Changing
            if (req.body.lengthConver > 0) {
                if (data.messages[data.messages.length - 1].senderId === NewMessages.senderId) { // if now senderUser is last SenderUser
                    data.messages[data.messages.length - 1].LastMsgInConver = false
                }

                //created a first message or updated the last message  
                modelConversation.updateOne({ _id: req.params.idConversat }, { $set: { messages: data.messages } })
                    .then(() => {
                        //Adding new message
                        modelConversation.updateOne({ _id: req.params.idConversat }, { $push: { messages: NewMessages } })
                            .then(() => {
                                console.log(`New message in ${req.params.idConversat} conversation`);
                                res.status(200);
                                res.json({ message: `New message in ${req.params.idConversat} conversation` });
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
            else {
                //Adding new message
                modelConversation.updateOne({ _id: req.params.idConversat }, { $push: { messages: NewMessages } })
                    .then(() => {
                        console.log(`New message in ${req.params.idConversat} conversation`);
                        res.status(200);
                        res.json({ message: `New message in ${req.params.idConversat} conversation` });
                    })
                    .catch(error => console.log(error));
            }

        })
        .catch(error => {
            console.log('Une erreur par ici');
            console.log(error);
        });


};

// search One conversation
exports.getOneConversation = (req, res) => {

};

// search AllEndConversation
exports.getEndsMessages = (req, res) => {
};

