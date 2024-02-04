const asynceHandle = require("express-async-handler")
const Chat = require("../Entity/chatEntity")
const User = require("../Entity/userEntity")


const { protect } = require("../middleware/auth")
const { Password } = require("@mui/icons-material")
const { use } = require("../Router/chatRouter")

const accessChat = asynceHandle(async (req, res) => {
    const { userId, chatNameValue } = req.body
    // console.log(userId);
    // console.log(chatNameValue);

    if (!userId) {
        res.send(400)
    }

    var ischat = await Chat.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password")
        .populate("lastMessage")

    ischat = await User.populate(ischat, {
        path: "lastMessage.sender",
        select: "name email"
    })
    //check có chat hay kh có trả vê còn nếu kh sẽ tạo 1 đoạn chat mới
    if (ischat.length > 0) {
        res.send(ischat[0])
    } else {
        var chatData = {
            chatName: "sender",
            isGroup: false,
            users: [req.user._id, userId]
        }
        try {
            const createChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(fullChat)
        } catch (error) {
            res.send(400)
            throw new Error(error.name)
        }
    }

})
const fetchChats = asynceHandle(async (req, res) => {
    try {
        // console.log("Fetch Chats : ", req);

        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("lastMessage")
            .sort({ _id: -1 })
            .then(async (results) => {

                results = await User.populate(results, {
                    path: "lastMessage.sender",
                    select: "name email",
                });
                res.status(200).send(results);
            });
        // console.log();
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

});
//gọi nhóm chat
const fetchGroups = asynceHandle(async (req, res) => {
    try {
        const allGroups = await Chat.where("isGroupChat").equals(true);
        res.status(200).send(allGroups);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
const createGroupChat = asynceHandle(async (req, res) => {

    // console.log(req.user);
    // console.log(req.body.users);
    // console.log(req.body.name);

    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Data is insufficient" });
    }
    var users = JSON.parse(req.body.users);
    // console.log(users);
    if (users.length < 2) {
        res.status(400).send("more 2 to create group chat")
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroup: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
const renameGroupChat = asynceHandle(async (req, res) => {
    const { chatId, chatName } = req.body

    const rename = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName
        },
        {
            new: true,
        }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!rename) {
        res.status(404).send("Chat Not found")
    } else {
        res.json(rename)
    }
})
const addUserToGroup = asynceHandle(async (req, res) => {
    const { chatId, userId } = req.body
    const addUser = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId }
        },
        {
            new: true,
        }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!addUser) {
        res.status(404).send("false to add new User")
    } else {
        res.json(addUser)
    }
})
const removeUserFromGroup = asynceHandle(async (req, res) => {
    const { chatId, userId } = req.body
    const remove = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId }
        },
        {
            new: true,
        }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!remove) {
        res.status(404).send("false to add new User")
    } else {
        res.json(remove)
    }
})
const findChatByName = asynceHandle(async (req, res) => {
    try {
        const results = await Chat.find({
            chatName: { $regex: req.query.chatName, $options: "i" },
            users: { $elemMatch: { $eq: req.user._id } }
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("lastMessage")
            .then(async (chat) => {
                if (!chat) {
                    return res.status(404).send("Chat not found");
                }

                const populatedChat = await User.populate(chat, {
                    path: "lastMessage.sender",
                    select: "name email",
                });

                // console.log(populatedChat);
                res.status(200).send(populatedChat);
            });
    } catch (error) {
        console.error("Error in findChatByName:", error);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = {
    accessChat,
    fetchChats,
    fetchGroups,
    createGroupChat,
    renameGroupChat,
    addUserToGroup,
    removeUserFromGroup,
    findChatByName


}