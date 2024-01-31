const express = require("express");
const User = require("../Entity/userEntity");
const expreeAsynceHandle = require("express-async-handler");
const generateToken = require("../config/generateToken");
const loginController = expreeAsynceHandle(async (req, res) => {
    const { name, password } = req.body;
    const uname = await User.findOne({ name })
    console.log(await uname.matchPassword(password));
    if (uname && (await uname.matchPassword(password))) {
        res.json({
            _id: uname._id,
            name: uname.name,
            email: uname.email,
            password: uname.password,
            token: generateToken(uname._id)
        });
    } else {
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

module.exports = { loginController, registerController, fetchUser }