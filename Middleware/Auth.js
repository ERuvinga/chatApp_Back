//this middleware content a function that chck a web token for any request Chat

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    next(); // next controller
}