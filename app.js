
// notre Application EPRESS

const express = require('express');
const app = express();  // methode express

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-type, authorization ');
    next();
})

app.use('/api/stuff', (req, res) => {

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
