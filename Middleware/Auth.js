//this middleware content a function that chck a web token for any request Chat

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token;
    let decodeToken;
    try {
        token = req.headers.autorization.split(' ');     // find a token in request
        token = token[1];                                // filtre a data 
        decodeToken = jwt.verify(token, process.env._RANDOM_TOKEN);

        const UserId = decodeToken.userId;
        req.auth = { UserId };
    }
    catch (error) {
        res.status(401);
        res.json({ error }); //responder a client with error content 
        console.log(error.message); // log the messageError
    }
    next(); // next controller
}