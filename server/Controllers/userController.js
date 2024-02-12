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
    // console.log(keyword);
    const u = await User.find(keyword).find({ _id: { $ne: req.user._id } })
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
            newPassword += Math.floor((Math.random() * (20 - 5)) + 5).toString();
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
            text: 'your new password: ' + newPassword
        };
        transporter.sendMail(mailOptions)

        res.status(200).send(user);
    } catch (error) {
        throw new Error(error)
    }
});


module.exports = { loginController, registerController, fetchUser, resetPassword }