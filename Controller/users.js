// all controller for users
const modelSchemauser = require('../Models/user');

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
exports.getAllUsers = (req, res) => {
    modelSchemauser.find({ _id: { $ne: req.auth.UserId } })
        .then(datas => {
            res.status(200);
            res.json({ users: datas })
        })
        .catch(error => {
            console.log(error);
        });
};