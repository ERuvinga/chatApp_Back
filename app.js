
// notre Application EPRESS

const express = require('express');
const app = express();  // methode express

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methodes', 'GET', 'POST');
    next();
})

app.use('/', (req, res) => {

    const stuff = [
        {
            _id: '1234',
            title: "mon article",
            description: "description de l'article",
            imageUrl: "",
            useId: 25
        }
    ]
    res.json(stuff);
    res.status(200);
});



module.exports = app;
