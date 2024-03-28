const express = require("express");
var nodemailer = require('nodemailer');
const User = require("../Entity/userEntity");
const expreeAsynceHandle = require("express-async-handler");
const generateToken = require("../config/generateToken");

const loginController = expreeAsynceHandle(async (req, res) => {
    const { name, password } = req.body;
    const uname = await User.findOne({ name })
    // console.log(await uname.matchPassword(password));
    if (uname && (await uname.matchPassword(password))) {
        // console.log("uname " + uname);
        res.json({
            _id: uname._id,
            name: uname.name,
            email: uname.email,
            password: uname.password,
            token: generateToken(uname._id)
        });
    } else {
        // return false
        throw new Error('login False')
    }

})
const registerController = expreeAsynceHandle(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.send(400)
        throw Error('valid value')
    }
    const uemail = await User.findOne({ email })
    if (uemail) {
        throw new Error('user already exists!!')
    }
    const uname = await User.findOne({ name })
    if (uname) {
        throw new Error('user already exists!!')
    }


    const user = await User.create({ name, email, password })
    if (user) {

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            token: generateToken(user._id)
        });
        console.log(user);
    }
    else {
        res.status(400)
        throw new Error('register False')
    }
})
const fetchUser = expreeAsynceHandle(async (req, res) => {
    const keyword = req.query.keyword ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    } : {}
    const u = await User.find(keyword).find({ _id: { $ne: req.user._id } })
    // console.log(u);
    res.send(u)
})
const fetchUserById = expreeAsynceHandle(async (req, res) => {

    const u = await User.find({ _id: req.body.userId })
    // console.log(u);
    res.send(u)
})
const resetPassword = expreeAsynceHandle(async (req, res) => {
    const name = req.body.name;
    // Tìm người dùng theo tên
    try {
        const user = await User.findOne({ name });

        let newPassword = '';
        for (let index = 0; index < 5; index++) {
            newPassword += Math.floor((Math.random() * (20 - 10)) + 5).toString();
        }

        user.password = newPassword;
        await user.save();
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'toanguyen120921@gmail.com',
                pass: 'pkyw ypxj uqrf qmno'
            }
        });
        var mailOptions = {
            from: 'toanguyen120921@gmail.com',
            to: user.email,
            subject: 'ResetPass Word',
            text: 'Mật khẩu mới của bạn là: ' + newPassword
        };
        transporter.sendMail(mailOptions)

        res.status(200).send(user);
    } catch (error) {
        throw new Error(error)
    }
});

const addFriend = expreeAsynceHandle(async (req, res) => {
    // const userId = req.body.userid
    const friendId = req.body.friendId
    const friend = await User.findOne({ _id: friendId }).select('-password');
    const user = await User.findOne({ _id: req.body.userid })
    console.log(user);
    try {
        const status = await User.findOneAndUpdate(user,
            {
                $push: {
                    friends: {
                        friend: friend,
                        sender: user,
                        accept: false
                    }
                }
            },
            { new: true })
        await User.findOneAndUpdate(friend,
            {
                $push: {
                    friends: {
                        friend: user,
                        sender: user,
                        accept: false
                    }
                }
            },
            { new: true })
        res.status(200).send(status)
    } catch (error) {
        res.status(400).send(error)
    }
});
const removeAddFriend = expreeAsynceHandle(async (req, res) => {
    // const userId = req.body.userid
    const friendId = req.body.friendId
    const friend = await User.findOne({ _id: friendId }).select('-password');
    const user = await User.findOne({ _id: req.body.userid })
    // console.log(user);
    try {
        const status = await User.findOneAndUpdate(user,
            {
                $pull: {
                    friends: {
                        friend: friend,
                    }
                }
            },
            { new: true })
        await User.findOneAndUpdate(friend,
            {
                $pull: {
                    friends: {
                        friend: user,
                    }
                }
            },
            { new: true })
        res.status(200).send(status)
    } catch (error) {
        res.status(400).send(error)
    }
});
const acceptFriend = expreeAsynceHandle(async (req, res) => {
    const friendId = req.body.friendId
    const user = await User.findOne({ _id: req.body.userid })
    const friend = await User.findOne({ _id: friendId }).select('-password');
    try {
        const status = await User.findOneAndUpdate(
            {
                _id: req.body.userid,
                'friends.friend': friend
            },
            { $set: { 'friends.$.accept': true } },

        );
        await User.findOneAndUpdate(
            {
                'friends.friend': user
            },
            { $set: { 'friends.$.accept': true } },
        );
        res.status(200).send(status)
    } catch (error) {
        res.send(error)
    }
});
const fetchInvitationFromClient = expreeAsynceHandle(async (req, res) => {
    const admin = req.body.admin
    // console.log({ _id: ObjectId(userId) });
    try {
        // const result = await User.find({ _id: Object(req.body.userid) })
        const result = await User.aggregate([
            { $match: { name: admin } }
            , {
                $project: {
                    friends: {
                        $filter: {
                            input: "$friends",
                            as: "friend",
                            cond: { $eq: ["$$friend.accept", false] }
                        }
                    }
                }
            }
        ]);
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})
const getUserNoAccept = expreeAsynceHandle(async (req, res) => {


    const { name, userId } = req.body
    console.log(userId);
    console.log(name);
    try {
        const result = await User.aggregate([
            {
                $match: { name: { $ne: name } } // Lọc ra tất cả các người dùng không phải Alice
            },
            {
                $lookup:
                {
                    from: "users",
                    localField: "_id",
                    foreignField: "friends.friend",
                    as: "friends_docs"
                }
            }
            , {
                $match: {
                    "friends_docs.name": { $nin: [name] }, // Lọc ra các tài liệu không có bạn bè
                }
            }
        ])
        console.log(result);
        res.send(result)
        // console.log(result);
    } catch (error) {
        res.send(error)
    }
})
const getUserwaitAccept = expreeAsynceHandle(async (req, res) => {
    const { name, userId } = req.body;
    try {
        const result = await User.aggregate([
            {
                $match: { name: { $ne: name } }
            },
            {
                $unwind: "$friends" // Giải nén mảng "friends"
            },
            {
                $lookup:
                {
                    from: "users",
                    let: { senderId: "$friends.sender" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$senderId"] },
                                "friends.accept": false
                            }
                        },
                        {
                            $project: { _id: 1, name: 1, accept: 1 }
                        }
                    ],
                    as: "friends_docs"
                }
            },
            {
                $match: {
                    "friends_docs.0": { $exists: true },
                    "friends.accept": false

                }
            }
        ]);
        // console.log(result);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});
const getUserAccept = expreeAsynceHandle(async (req, res) => {
    const { name, userId } = req.body;
    try {
        const result = await User.aggregate([
            {
                $match: { name: { $ne: name } }
            },
            {
                $unwind: "$friends" // Giải nén mảng "friends"
            },
            {
                $lookup:
                {
                    from: "users",
                    let: { senderId: "$friends.sender" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$senderId"] },
                                "friends.accept": true
                            }
                        },
                        {
                            $project: { _id: 1, name: 1, accept: 1 }
                        }
                    ],
                    as: "friends_docs"
                }
            },
            {
                $match: {
                    "friends_docs.0": { $exists: true },
                    "friends.accept": true

                }
            }
        ]);
        // console.log(result);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

module.exports = {
    fetchUserById,
    getUserAccept,
    getUserNoAccept,
    removeAddFriend,
    fetchInvitationFromClient,
    loginController,
    registerController,
    fetchUser,
    resetPassword,
    addFriend,
    acceptFriend,
    getUserwaitAccept
}