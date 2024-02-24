const express = require("express")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const userRouter = require('./Router/userRouter.js')
const chatRouter = require('./Router/chatRouter.js')
const messRouter = require('./Router/mesRouter.js')
const { Server } = require('socket.io');
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
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]

    }
});
server.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
})

const connectData = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        console.log('connect server', error);
    }

}
connectData()
app.get("/", (req, res) => { res.send('app running') })
app.use("/user", userRouter)
app.use("/chat", chatRouter)
app.use("/message", messRouter)


io.on("connection", (socket) => {
    console.log(socket.id + ": connected");

    socket.on("setup", (userData) => {
        socket.join(userData._id)
        socket.emit("connected")
    })
    socket.on("new-mes", (data) => {
        console.log(data);
        data.chat.users.map((item) => {
            if (data.sender._id !== item._id) return;
            else
                socket.emit("mess-rcv", data)

        })
    })
    socket.on("demo", (data) => {
        console.log(data.mes);
        socket.broadcast.emit("demo-rcv", data)

    })

    socket.on("new-group", (data) => {
        console.log(data);
        socket.broadcast.emit("group-rcv", data)

    })
    socket.on("render-box-chat", (data) => {
        socket.broadcast.emit("render-box-chat-rcv", !data)
    })

    socket.off("setup", (userData) => {
        console.log(socket.id + ": dis");
        socket.leave(userData._id)
    })

});






