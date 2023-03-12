
// notre Application EPRESS

const express = require('express');
require('./db/index'); //include the function connect api to database

const app = express();  // methode express
const authRoute = require('./Routes/auth');
const UsersRoute = require('./Routes/users');
const ConversationRoute = require('./Routes/conversation');

app.use(express.json());
app.use((req, res, next) => { // Middlware that control a CORS methodes
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

// middleware test if api is running in deploy
app.get("/test", (req, res) => {
    res.end("Test Api! Api fuctionnel")
});

// routes of Api
app.use('/api/Auth', authRoute);
app.use('/api/user', UsersRoute);
app.use('/api/conversations', ConversationRoute)

module.exports = app;
