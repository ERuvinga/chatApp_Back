
// this middleware content content functions cheching the validity of token
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.autorization.split(' '); // find a token in request
        token = token[0];                                   // filtre a data 
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};