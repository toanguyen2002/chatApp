const mongooes = require("mongoose")

const messageEntity = mongooes.Schema({
    sender: {
        type: mongooes.Schema.Types.ObjectId,
        ref: "User"
    },
    reciever: {
        type: mongooes.Schema.Types.ObjectId,
        ref: "User"
    },
    chat: {
        type: mongooes.Schema.Types.ObjectId,
        ref: "Chat"
    }
}, {
    TimeStamp: true
})

const Message = mongooes.Model("Message", messageEntity)
module.exports = Message
