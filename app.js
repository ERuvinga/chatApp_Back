
// notre Application EPRESS

const express = require('express');
const app = express();  // methode express
require('./db/index'); //include the function connect api to database

app.use((req, res, next) => { // Middlware that control a CORS methodes
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

app.use((req, res) => { });

module.exports = app;
