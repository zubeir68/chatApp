const express = require('express');

const app = express();

const http = require('http').Server(app);

const io = require('socket.io');

const port = 5000;

const socket = io(http);

socket.on('connection', socket => {
    console.log('User is connected', socket);
    socket.on('disconnect', () => {
        console.log('User is disconnected');
    })
})

socket.on('chat message', function(msg) {
    console.log(`MESSAGE => ${msg}`);
    socket.broadcast.emit('received', { message: msg });
})

http.listen(port, () => {
    console.log(`connected to port ${port}`);
})