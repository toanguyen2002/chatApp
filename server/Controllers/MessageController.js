const expressAsyncHandler = require("express-async-handler");
const Message = require("../Entity/MessageEntity");
const User = require("../Entity/userEntity");
const Chat = require("../Entity/chatEntity");



const allMessages = expressAsyncHandler(async (req, res) => {
    try {
        const mes = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name email")
            .populate("reciever")
            .populate("chat")
        res.json(mes)
        // console.log(mes);
        // console.log(mes);
    } catch (error) {

    }
})


const sendMessage = expressAsyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };


    var message = await Message.create(newMessage);

    // console.log(message);
    message = await message.populate("sender", "name");
    message = await message.populate("chat");
    message = await message.populate("reciever");
    message = await User.populate(message, {
        path: "chat.users",
        select: "name email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.json(message);
})

module.exports = {
    sendMessage, allMessages
}
