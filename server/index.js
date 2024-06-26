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
app.use(cors({ origin: '*' }))
app.use(express.json())
const io = new Server(server, {
    pingTimeout: 5000,
    cors: {
        origin: "*",
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
    console.log(socket.id + ": connected");;

    socket.on("setup", (userData) => {
        socket.join(userData._id)
        socket.emit("connected")
    })
    //tham gia room chat
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    //send mess mới
    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        console.log(chat);
        if (!chat.users) return;
        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.emit("message recieved", newMessageRecieved);
        });
    });
    //socket.on("new-mes", (data) => {
    //  console.log(data);
    // data.chat.users.map((item) => {
    //     if (data.sender._id !== item._id) return;
    //     else
    //         socket.broadcast.emit("mess-rcv", !data)

    // })
    //})
    // socket.on("demo", (data) => {
    //     console.log(data.mes);
    //     socket.broadcast.emit("demo-rcv", data)

    // })

    socket.on("CallUser", (data) => {
        console.log(data);
        io.to(data.UserCall).emit("CallUser", { signal: data.signalData, from: data.from, name: data.name })
    })

    socket.on("answerCall", (data) => {
        io.to(data.to)
            .emit("callAccept", data.signal)
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






