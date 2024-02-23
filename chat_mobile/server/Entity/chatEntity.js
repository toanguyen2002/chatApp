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
    lastMessage: {
        type: mongooes.Schema.Types.ObjectId,
        ref: "Message"
    }
})

const Chat = mongooes.model("Chat", chatEntity)
module.exports = Chat