import connectDB from './config/db.js';
import express, { application } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import countryRoutes from './routes/countryRoutes.js'
import cityRoutes from './routes/cityRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import conversationRoutes from './routes/conversationRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import connectDummyDB from './config/testdb.js';
import path from 'path'
import { createServer } from 'http';
import { Server } from "socket.io";

dotenv.config();

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'testdb') {
    connectDummyDB();
}
// if (process.env.NODE_ENV == 'db') {
if (process.env.NODE_ENV == 'production') {
    connectDB();
}

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/countries', countryRoutes);

app.use('/api/cities', cityRoutes);

app.use('/api/messages', messageRoutes);

app.use('/api/conversations', conversationRoutes);

app.use('/api/blogs', blogRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
    console.log(process.env.NODE_ENV);
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('frontend', 'build', 'index.html'));
    });
}

const httpServer = createServer(app);
const io = new Server(httpServer);

let users = [];

const addUser = (userId, socketId) => {
    console.log(userId);
    !users.some(user => user.userId === userId) && users.push({ userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    var us = users.find(user => user.userId === userId)
    console.log("us " + us);
    return users.find(user => user.userId === userId)
}

io.on('connection', socket => {
    console.log("user connected");
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        console.log(users);
        io.emit("getUsers", users);
    })

    socket.on("sendMessage", ({ sender, reciever, contents }) => {
        const user = getUser(reciever);
        console.log(user);
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                sender,
                contents
            })
        }

    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
});

httpServer.listen(PORT, console.log('Server starting at ' + PORT));

export default app;