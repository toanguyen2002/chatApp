const express = require("express")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const userRouter = require('./Router/userRouter.js')
const chatRouter = require('./Router/chatRouter.js')
const messRouter = require('./Router/mesRouter.js')


const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())
const post = 8080
const server = app.listen(process.env.PORT, () => {
    // console.log(process.env.PORT);
})
app.use(express.json())
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