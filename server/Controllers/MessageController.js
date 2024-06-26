const expressAsyncHandler = require("express-async-handler");
const Message = require("../Entity/MessageEntity");
const User = require("../Entity/userEntity");
const Chat = require("../Entity/chatEntity");
const { promisify } = require("util");
const crypto = require('crypto')
const mongodb = require('mongodb');
const { default: mongoose } = require("mongoose");



const AWS = require('aws-sdk')
const { log } = require("console");
const { send } = require("process");
const randomBytes = promisify(crypto.randomBytes)

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;



const s3client = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
    // signatureVersion: "v4"
});


const uploadImage = async (imageData) => {
    // const arrayImage = []
    try {

        const params = {
            Bucket: "upload-file-img",
            Key: imageData.originalname,
            Body: imageData.buffer,
            ContentType: imageData.mimeType
        };
        // Sử dụng await để đợi kết quả từ promise được trả về từ phương thức putObject
        const uploadResult = await s3client.putObject(params).promise();
        // console.log("Upload result:", uploadResult);
        const imageUrl = `https://upload-file-img.s3.amazonaws.com/${imageData.originalname}`;
        // arrayImage.push(imageUrl)
        console.log(imageUrl);
        return imageUrl;


    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

const sendMessImage = expressAsyncHandler(async (req, res) => {
    const { file } = req
    console.log(file);
    try {
        const url = await uploadImage(file);
        res.status(200).json({ url });
    } catch (err) {
        console.error("Error uploading image:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


const allMessages = expressAsyncHandler(async (req, res) => {
    try {
        const mes = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name email")
            .populate("reciever")
            .populate("chat")
        res.json(mes)
    } catch (error) {

    }
})


const sendMessage = expressAsyncHandler(async (req, res) => {
    const { content, chatId, typeMess, ImageUrl } = req.body;
    const chat = await Chat.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(chatId) } }])
    const arrOfStrings = chat[0].users.map(objId => objId.toString());
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
        typeMess: typeMess,
        ImageUrl: ImageUrl
    };
    if (!arrOfStrings.includes(req.user._id.toString())) {
        return res.status(404).json({ message: "Cuộc trò chuyện không tồn tại." });
    }
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name");
    message = await message.populate("chat");
    message = await message.populate("reciever");
    message = await User.populate(message, {
        path: "chat.users",
        select: "name email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, { lastMessage: message });
    res.json(message);
})

const blacnkMess = expressAsyncHandler(async (req, res) => {
    const { messId } = req.body;
    const result = await Message.findByIdAndUpdate(messId, { content: '' });
    res.json(result);
})
const deleteMess = expressAsyncHandler(async (req, res) => {
    const { messId, userId } = req.body;
    const result = await Message.findOne({ _id: messId });
    result.removeWitMe.push(userId)
    result.save()
    // console.log();
    res.json(result);
})


module.exports = {
    sendMessage, allMessages, sendMessImage, blacnkMess, deleteMess
}
