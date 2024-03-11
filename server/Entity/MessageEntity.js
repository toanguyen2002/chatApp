const mongooes = require("mongoose")
const bcrypt = require("bcryptjs")
const messageEntity = mongooes.Schema({
    sender: {
        type: mongooes.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        trim: true
    },
    reciever: {
        type: mongooes.Schema.Types.ObjectId,
        ref: "User",
    },
    chat: {
        type: mongooes.Schema.Types.ObjectId,
        ref: "Chat"
    },
    typeMess: {
        type: String
    }
}, {
    TimeStamp: true
})

const Message = mongooes.model("Message", messageEntity)
module.exports = Message
