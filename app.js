
// notre Application EPRESS

const express = require('express');
require('./db/index'); //include the function connect api to database

const app = express();  // methode express
const UsersRoute = require('./Routes/user');
const ConversationRoute = require('./Routes/conversation');

app.use(express.json());
app.use((req, res, next) => { // Middlware that control a CORS methodes
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

app.use('/api/Auth', UsersRoute);
app.use('/api/conversations', ConversationRoute)

module.exports = app;
