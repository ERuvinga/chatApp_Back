
// this middleware content content functions cheching the validity of token
const modelUsers = require('../Models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//controller that control a login endpoint
exports.login = (req, res) => {

    modelUsers.findOne({ email: req.body.email })
        .then(UserFund => {
            if (UserFund) {
                bcrypt.compare(req.body.password, UserFund.password)
                    .then(isValid => {
                        if (isValid) {
                            res.status(200);
                            res.json({
                                message: `${UserFund.email}: connected `,
                                userId: UserFund._id,
                                token: jwt.sign({ userId: UserFund._id }, process.env._RANDOM_TOKEN)
                            });
                            console.info(`${UserFund.email}: connected `)
                        }

                        else {
                            res.status(401);
                            res.json({ message: 'email-password invalid' });
                            console.log('incorect password!');
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        res.status(500);
                        res.end(error);
                    });
            }

            else {
                res.status(401);
                res.json({ message: 'email-password invalid' });
                console.error("incorect email");
            }
        })
        .catch(error => {
            res.status(404);
            res.end(error);
            console.error(error);
        })
}


// controller that control a register endpoint
exports.register = (req, res) => {
    const saltCrypt = 10;

    bcrypt.hash(req.body.password, saltCrypt)
        .then(passwordCrypt => {
            user = new modelUsers({
                email: req.body.email,
                password: passwordCrypt
            }); // create a new user and check it with model and shema

            // if this data correct, we save it
            user.save()
                .then((dataUser) => {
                    res.status(200);
                    res.json({ message: `${dataUser.email} : New user created` });
                })
                .catch(error => {
                    res.status(401);
                    res.json({ message: `${req.body.email} : user exist` });
                    console.error(error);
                });
        })

        .catch(error => {
            res.status(500);
            res.json({ error });
            console.error(error);
        })
}


exports.CheckAuthentiqUser = (req, res) => {
    let token;
    let decodeToken;
    try {
        token = req.headers.autorization.split(' ');     // find a token in request
        token = token[1];                                // filtre a data 
        decodeToken = jwt.verify(token, process.env._RANDOM_TOKEN);

        //search user in dataBase
        modelUsers.findOne({ _id: decodeToken.userId })
            .then(dataOfUser => {
                res.status(200);
                res.json({
                    email: dataOfUser.email,
                    name: dataOfUser.name,
                    picture: dataOfUser.picture,
                    lastTimeOnline: dataOfUser.lastOnline,
                    status: dataOfUser.status,
                    userId: dataOfUser._id
                })
            })
            .catch(error => {
                console.log(error);
                res.status(401);
                res.json({ userId: null })
            })


    }
    catch (error) {
        res.status(401);
        res.json({ error }); //responder a client with error content 
        console.log(error.message); // log the messageError
    }
};