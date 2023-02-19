// all controller for users
const modelSchema = require('../Models/user');
const bcrypt = require('bcrypt');

//controller that control a login endpoint
exports.login = (req, res) => {
    console.log(req.body);


}

// controller that control a register endpoint
exports.register = (req, res) => {
    const saltCrypt = 10;

    bcrypt.hash(req.body.password, saltCrypt)
        .then(passwordCrypt => {

            user = new modelSchema({
                email: req.body.email,
                password: passwordCrypt
            }); // create a new user and check it with model and shema

            // if this data correct, we save it
            user.save()
                .then((dataUser) => {
                    console.log(`user Create success : ${dataUser}`);
                    res.status(200);
                    res.json({ dataUser });
                })
                .catch(error => {
                    res.status(400);
                    res.json({ error });
                    console.error(error);
                });
        })

        .catch(error => {
            res.status(500);
            res.json({ error });
            console.error(error);
        })
}