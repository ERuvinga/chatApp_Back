// all controller for users
const modelSchema = require('../Models/user');

//controller that control a login endpoint
exports.login = (req, res) => {
    console.log(req.body);


}

// controller that control a register endpoint
exports.register = (req, res) => {
    console.log(req.body);
    user = new modelSchema({
        ...req.body
    }); // create a new user and check it with model and shema

    // if this data correct, we save it
    user.Save()
        .then(() => {
            console.log('userCreate success');
        })
        .catch(error => {
            console.log(error);
        });
}