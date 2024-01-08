const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMsg, locationGenerateMsg } = require('./utils/message');
const { addUser, removeUser, getUser, getUserInRoom } = require('./utils/user');
require('dotenv').config();

const app = express()

const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0;
let data = 'Welcome to the chat app'

// .on method is used for listening
// .emmit method is used for sending

// if we use io here it means we can send to the server and we can receive from the server with whole connection

// But if we use the socket it only listen particular connection

// in the in side custom increment method if we use socket.emit it only listen particular connection but if we use app.emit it listen all connections

io.on('connection', (socket) => {
    // console.log('Socket is connected...');
    // socket.emit('countUpdated', count)

    // socket.on('increment', () => {
    //     count++
    //     io.emit('countUpdated', count)
    // })

    // socket.emit('message', generateMsg(data))
    // Broadcast Events
    // socket.broadcast.emit('message', generateMsg("A new User is joined"))

    socket.on('join', ({ username, room }, callBack) => {

        const { error, user } = addUser({ id: socket.id, username, room })

        if (error)
            return callBack(error)

        // join the particular connection in the given room
        socket.join(user.room)

        // if we use socket.broadcast.to(room) it only listen particular room
        socket.emit('message', generateMsg('Admin', data))
        socket.broadcast.to(user.room).emit('message', generateMsg('Admin', `${user.username} has joined`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUserInRoom(user.room)
        })
        callBack()
    })

    // Disconnect Event
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        // io.emit() is send message to all connection
        if (user) {
            io.to(user.room).emit('message', generateMsg(user.username, `${user.username} has left a room`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUserInRoom(user.room)
            })

        }
    })




    // TO show the ack here we have to pass one more argument in arrowfunction
    socket.on('sendMessage', (data, callBack) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if (filter.isProfane(data)) {
            return callBack('Profanity is not allowed')
        }
        io.to(user.room).emit('message', generateMsg(user.username, data))
        callBack()
        // callBack("Message was delivered successfully")
    })



    socket.on('sendLocation', (data, callBack) => {
        const user = getUser(socket.id)
        if (!data) {
            return callBack('Profanity is not allowed')

        }
        io.to(user.room).emit('locationMessage', locationGenerateMsg(user.username, `https://google.com/maps?q=${data.lat},${data.long}`))
        callBack()

    })
})



server.listen(port, () => {
    console.log('Server is started on port ' + port);
})
