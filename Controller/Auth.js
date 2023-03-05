
// this middleware content content functions cheching the validity of token
const jwt = require('jsonwebtoken');
const Random = 'RANDOM\?/CHATAPP';

module.exports = (req, res) => {
    let token;
    let decodeToken;
    try {
        token = req.headers.autorization.split(' ');     // find a token in request
        token = token[1];                                // filtre a data 
        decodeToken = jwt.verify(token, Random);
        //send a datas
        res.status(200);
        res.json({ userId: decodeToken.userId })
    }
    catch (error) {
        res.status(401);
        res.json({ error }); //responder a client with error content 
        console.log(error.message); // log the messageError
    }
};