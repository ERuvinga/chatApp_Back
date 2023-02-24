// this file content all information that hepl to connect this Node Api to the mongoAtlas
const jwt = require('jsonwebtoken');

const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhcyI6IkVSdXZpbmdhLDdOYjV6ZmNpNXp2WTZROGMiLCJpYXQiOjE2NzY4NDgxNzN9.8XuouOz-NCmMJGZ99JuOHVeCgc5OPyPR_mwesQdKLAk";
const secretKey = 'QWATR/|DONATEeLIE';

const dataMongo = jwt.verify(Token, secretKey).datas.split(',');


exports.MongoInfos = {
    user: dataMongo[0],
    password: dataMongo[1]
};
