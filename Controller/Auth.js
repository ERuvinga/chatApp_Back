
// this middleware content content functions cheching the validity of token
const jwt = require('jsonwebtoken');
const modelUsers = require('../Models/user');
const Random = 'RANDOM\?/CHATAPP';

module.exports = (req, res) => {
    let token;
    let decodeToken;
    try {
        token = req.headers.autorization.split(' ');     // find a token in request
        token = token[1];                                // filtre a data 
        decodeToken = jwt.verify(token, Random);

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