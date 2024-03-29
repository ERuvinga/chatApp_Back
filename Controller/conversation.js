const modelConversation = require('../Models/conversation');
const modelLastMessage = require('../Models/LastMessage');

//add New Conversation
exports.NewConversation = (req, res, next) => {
    _idFirstMember = req.auth.UserId;
    _idSecondMember = req.body._idOtherUser;

    //check if this conversation are available
    modelConversation.findOne({ $or: [{ $and: [{ "members.0": _idFirstMember }, { "members.1": _idSecondMember }] }, { $and: [{ "members.0": _idSecondMember }, { "members.1": _idFirstMember }] }] })
        .then(conversation => {
            if (conversation === null) { //if notFund conversation, create new
                const Conversat = new modelConversation({
                    members: [
                        req.auth.UserId,
                        req.body._idOtherUser
                    ],
                    messages: []
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

                //respond client
                res.status(200);
                res.json({
                    _idConv: conversation._id,
                    messages: conversation.messages
                });

                req.Users = {
                    _idFirstMember,
                    _idSecondMember
                }
                next();
            }
        })
        .catch(error => {
            console.log("Erreur par ici");
            console.log(error)
            res.status(401);
            res.json({ error });
        });
};



// New message 
exports.AddNewMessage = (req, res, next) => {
    _idFirstMember = req.auth.UserId;
    _idSecondMember = req.body._idOtherUser;

    const NewMessages = {
        message: req.body.dataOfMessage.messages.message,
        type: req.body.dataOfMessage.messages.type,
        Hour: req.body.dataOfMessage.messages.hour,
        senderId: req.auth.UserId,
        LastMsgInConver: true,
    }

    modelConversation.findOne({ $or: [{ $and: [{ "members.0": _idFirstMember }, { "members.1": _idSecondMember }] }, { $and: [{ "members.0": _idSecondMember }, { "members.1": _idFirstMember }] }] })
        .then(data => {
            //checking if conversation content messages and if SenderUser Changing
            if (req.body.lengthConver > 0) {
                if (data.messages[data.messages.length - 1].senderId === NewMessages.senderId) { // if now senderUser is last SenderUser
                    data.messages[data.messages.length - 1].LastMsgInConver = false
                }

                //created a first message or updated the last message  
                modelConversation.updateOne({ $or: [{ $and: [{ "members.0": _idFirstMember }, { "members.1": _idSecondMember }] }, { $and: [{ "members.0": _idSecondMember }, { "members.1": _idFirstMember }] }] }, { $set: { messages: data.messages } })
                    .then(() => {
                        //Adding new message
                        modelConversation.updateOne({ $or: [{ $and: [{ "members.0": _idFirstMember }, { "members.1": _idSecondMember }] }, { $and: [{ "members.0": _idSecondMember }, { "members.1": _idFirstMember }] }] }, { $push: { messages: NewMessages } })
                            .then(() => {
                                console.log(`New message in ${req.params.idConversat} conversation`);
                                req.Lastmessage = { NewMessages, _idFirstMember, _idSecondMember };
                                next();
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
            else {
                //Adding new message
                modelConversation.updateOne({ $or: [{ $and: [{ "members.0": _idFirstMember }, { "members.1": _idSecondMember }] }, { $and: [{ "members.0": _idSecondMember }, { "members.1": _idFirstMember }] }] }, { $push: { messages: NewMessages } })
                    .then(() => {
                        req.Lastmessage = { NewMessages, _idFirstMember, _idSecondMember };
                        console.log(`New message in ${req.params.idConversat} conversation`);
                        next();
                    })
                    .catch(error => console.log(error));
            }

        })
        .catch(error => {
            console.log(error);
        });
};

// create New LastMessage document
exports.LastMessage = (req, res) => {
    console.log("Updated Last Message");
    let noReadMsg_updates = [];

    //search LastMessage
    modelLastMessage.findOne({ $or: [{ $and: [{ "members.0": req.Lastmessage._idFirstMember }, { "members.1": req.Lastmessage._idSecondMember }] }, { $and: [{ "members.0": req.Lastmessage._idSecondMember }, { "members.1": req.Lastmessage._idFirstMember }] }] })
        .then(LastMessage => {
            //check data 
            noReadMsg_updates = LastMessage.noReadMesgs;
            noReadMsg_updates.map((value)=>{
                if(value.user !== req.Lastmessage.NewMessages.senderId){
                    value.val += 1;
                }
            })

           // updated document
            modelLastMessage.updateOne({ _id: LastMessage._id }, {
                messages: {
                    type: req.Lastmessage.NewMessages.type,
                    content: req.Lastmessage.NewMessages.message
                },
                noReadMesgs :noReadMsg_updates,
                hour: Date.now(),
            })
                .then()
                .catch(error => console.log(error));
        })

        .catch();


    res.status(200);
    res.json({ message: req.Lastmessage.NewMessages });
}

// reset OneConversation
exports.resetUnReadMsg = (req, res) => {
    
    let noReadMesgs_now =[]; 
    modelLastMessage.findOne({ $or: [{ $and: [{ "members.0": req.Users._idFirstMember }, { "members.1": req.Users._idSecondMember }] }, { $and: [{ "members.0": req.Users._idSecondMember }, { "members.1": req.Users._idFirstMember }] }] })
    .then(Lmsg =>{
        noReadMesgs_now = Lmsg.noReadMesgs;
        noReadMesgs_now.map((value)=>{
            if(value.user === req.auth.UserId){
                value.val = 0;
            }
        })
         //update a number of no Read message of user
            modelLastMessage.updateMany({ $or: [{ $and: [{ "members.0": _idFirstMember }, { "members.1": _idSecondMember }] }, { $and: [{ "members.0": _idSecondMember }, { "members.1": _idFirstMember }] }] }, {
                    $set: { noReadMesgs: noReadMesgs_now}
                    })
                    .then()
                    .catch(error => console.log(error));
        
    })
};

