const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io')
// const nodemailer = require('nodemailer');

const authRoute = require('./route/authRoute')
const userRoute = require('./route/userRoute');
const conversationRoute = require('./route/conversationRoute');
const messageRoute = require('./route/messageRoute');
const { text } = require('express');

const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/conversation', conversationRoute)
app.use('/message', messageRoute)



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log('bd connecté')
})

const server = app.listen(PORT, () => {
    console.log('server listening on port ' + PORT)
})

// console.log(server);
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
})
global.onlineUsers = new Map()
let usersOnline =[]

const addUser = (userId, socketId) => {
    onlineUsers.set(userId, socketId)
    !usersOnline.some(user => user.userId === userId) && usersOnline.push({ userId, socketId })
}

const removeUser = (socketId)=>{
    usersOnline = usersOnline.filter(user => user.socketId !== socketId)
} 

const getUser = (userId) => {
    return onlineUsers.get(userId)
}

//connection au socket
io.on("connection", (socket) => {
    console.log('utilisateur connecté');
    // recupérer le socketId et le userId envoyer par le client
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        //envoyre la liste des utilisateur connecté
        io.emit("getUsers", usersOnline)
    })

    // envoie et reception des messages
    socket.on("sendMessage",({senderId, receivedId, message})=>{
        const userReceived = getUser(receivedId)
        io.to(userReceived).emit('getMessage',{
            senderId,
            message
        })
    })

    //deconnexion
    socket.on('disconnect',()=>{
        console.log("user disconnected")
        removeUser(socket.id)
        io.emit('getUsers', usersOnline)
    })
})