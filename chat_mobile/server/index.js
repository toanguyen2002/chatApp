const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require('./Router/userRouter.js')
const chatRouter = require('./Router/chatRouter.js')
const messRouter = require('./Router/mesRouter.js')
const { Server } = require('socket.io');
const { createServer } = require("vite")
const http = require("http")

const app = express()
const server = http.createServer(app);
require('dotenv').config()

// Configure CORS to allow requests from the specified origin
app.use(cors({
    origin: "https://mail.getandbuy.shop",
    methods: ["GET", "POST"],
}));

app.use(express.json())

const io = new Server(server, {
    pingTimeout: 6000,
    cors: {
        origin: "https://mail.getandbuy.shop",
        methods: ["GET", "POST"]
    }
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

const connectData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        io.on("connection", (socket) => {
            // ...
            socket.on("new-mes", (data) => {
                data.chat.users.map((item) => {
                    if (data.sender._id !== item._id) return;
                    socket.emit("mess-rcv", data)
                })
            })
            socket.on("new-group", (data) => {
                data.users.map((item) => {
                    socket.emit("group-rcv", data)
                })
            })

            socket.on("disconnect", () => {
                console.log(socket.id + " disconnected");
                socket.disconnect()
            })
        });
    } catch (error) {
        console.log('Error connecting to the server', error);
    }
}

connectData()

app.get("/", (req, res) => { res.send('App is running') })
app.use("/user", userRouter)
app.use("/chat", chatRouter)
app.use("/message", messRouter)
