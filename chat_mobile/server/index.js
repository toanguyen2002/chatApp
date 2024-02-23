const express = require("express")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const userRouter = require('./Router/userRouter.js')
const chatRouter = require('./Router/chatRouter.js')
const messRouter = require('./Router/mesRouter.js')
const { Server } = require('socket.io');
const { createServer } = require("vite")
const http = require("http")

const post = 8080
const app = express()
const server = http.createServer(app);
require('dotenv').config()
app.use(cors())
app.use(express.json())
const io = new Server(server, {
    pingTimeout: 6000,
    cors: {
        origin: "*",
        methods: ["GET", "POST"]

    }
});

// io.on("connection", (socket) => {
//     console.log(socket.id);
//     socket.on("setup", (userData) => {
//         console.log(userData);
//     })
//     socket.on("new-message", (newMessageRecieved) => {
//         var chat = newMessageRecieved.chat;
//         io.emit("data-receiver", chat)
//     })
// })

server.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
})

const connectData = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
            .then(() => {
                io.on("connection", (socket) => {
                    // ...
                    // console.log(socket.id + "connected");
                    socket.on("new-mes", (data) => {
                        data.chat.users.map((item, index) => {
                            if (data.sender._id !== item._id) return;
                            else
                                socket.emit("mess-rcv", data)
                        })
                    })
                    socket.on("new-group", (data) => {
                        data.users.map((item) => {
                            socket.emit("group-rcv", data)
                        })

                    })

                    socket.on("disconnect", () => {
                        console.log(socket.id + "dis");
                        socket.disconnect()
                    })
                });
            })
    } catch (error) {
        console.log('connect server', error);
    }

}
connectData()
app.get("/", (req, res) => { res.send('app running') })
app.use("/user", userRouter)
app.use("/chat", chatRouter)
app.use("/message", messRouter)





