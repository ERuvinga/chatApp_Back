// all controller for users
const modelSchemauser = require('../Models/user');
const modelLastMessage = require('../Models/LastMessage');

//find One user
exports.getOneUser = (req, res) => {

    modelSchemauser.findOne({ _id: req.params.userId })
        .then(datas => {
            res.status(200);
            res.json({ datas });
        })
        .catch(error => {
            console.log(error);
            res.status(401);
            res.json({ error });
        });
}

//find all Users
exports.getAllUsers = (req, res, next) => {
    modelSchemauser.find({ _id: { $ne: req.auth.UserId } })
        .then(datas => {
            req.AllUsers = datas;
            next()
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getAllLastMesg = (req, res) => {
    modelLastMessage.find()
        .then((LastMesg) => {
            console.log(LastMesg);
            res.status(200);
            res.json({ users: req.AllUsers, lastMesg: LastMesg });
        })
        .catch((error) => console.log(error));

}