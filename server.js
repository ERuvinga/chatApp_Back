// server app
require('dotenv').config(); // config a env variables
const http = require('http');
const app = require('./app');

// function to Normaliz format of Port
const normalPort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }
    return false;
};



const port = normalPort(process.env._PORT);
app.set('port', port);
const server = http.createServer(app);

server.listen(port);
