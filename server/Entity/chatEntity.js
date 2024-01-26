const mongooes = require("mongoose")

const chatEntity = mongooes.Schema({
    chatName: { type: String },
    isGroup: { type: Boolean },
    users: [
        {
            type: mongooes.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    groupAdmin: {
        type: mongooes.Schema.Types.ObjectId,
        ref: "User"
    }
    ,
    typeMessage: {
        type: String
    },
    lastMessage: {
        type: mongooes.Schema.Types.ObjectId,
        ref: "Message"
    }
})

const Chat = mongooes.Model("Chat", chatEntity)
module.exports = Chat