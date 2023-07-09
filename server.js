// server app
require('dotenv').config(); // config a env variables
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const updateStatusOfUsers = require("./Controller/statusUser");

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

    socket.on('New_Connection', (User) => {
        socket.idUser = User.user;
        updateStatusOfUsers.userConnected(socket.idUser.userId);
        socket.broadcast.emit('user_Connected',socket.idUser); // emit event to Other User
    });

    socket.on('New_Message', (message) => { // addEventList New_Message
        const eventMessages ={
            other:message.Other,
            userSender: socket.idUser 
        };
        
        io.emit('New_Message', eventMessages);
    });

    socket.on('disconnect', ()=>{
        updateStatusOfUsers.userDisconnected(socket.idUser.userId);// updated status of user
        socket.broadcast.emit('user_disconnected',socket.idUser); // emit event to Other User
    });
});

// fuctions of socket.io

server.listen(port);
