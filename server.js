// server app
require('dotenv').config(); // config a env variables
const http = require('http');
const { Server } = require('socket.io');
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
const io = new Server(server, {
    cors: {
        origin: "*" // all origin access socket 
    }
}); // socket.io integrated

io.on("connection", (socket) => {
    socket.broadcast.emit('user_Connected', 'Other User Connected'); // emit event to Other User
    socket.on('New_Message', (message) => { // addEventList New_Message
        console.log(message);
        io.emit('New_Message', message.Other);
    })
});

// fuctions of socket.io

server.listen(port);
