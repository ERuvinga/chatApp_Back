// mon point d'entree de mon app

const http = require('http');
const app = require('./app');


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



const port = normalPort(4200);
app.set('port', port);
const server = http.createServer(app);

server.listen(port);
