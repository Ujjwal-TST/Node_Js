const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
require('dotenv').config();

const app = express()

const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0;

// .on method is used for listening
// .emmit method is used for sending

// if we use io here it means we can send to the server and we can receive from the server with whole connection

// But if we use the socket it only listen particular connection

// in the in side custom increment method if we use socket.emit it only listen particular connection but if we use app.emit it listen all connections

io.on('connection', (socket) => {
    console.log('Socket is connected...');
    socket.emit('countUpdated', count)
    socket.on('increment', () => {
        count++
        io.emit('countUpdated', count)
    })
})



server.listen(port, () => {
    console.log('Server is started on port ' + port);
})
