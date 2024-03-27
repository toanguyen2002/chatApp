<<<<<<< HEAD
const mongooes = require("mongoose")
const bcrypt = require('bcryptjs')
const userEntity = mongooes.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    friends: [
        {
            friend: {
                type: mongooes.Schema.Types.ObjectId,
                ref: "User"
            },
            sender: {
                type: mongooes.Schema.Types.ObjectId,
                ref: "User"
            },
            accept: {
                type: Boolean
            }
        }
    ]
}, {
    TimeStamp: true
})
userEntity.methods.matchPassword = async function (enteredPassword) {
    // console.log("entered", enteredPassword);
    // console.log(this.password);
    return await bcrypt.compare(enteredPassword, this.password);
};
userEntity.pre("save", async function (next) {
    //check mk đã băm hay chưa
    if (!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
userEntity.pre("findOneAndUpdate", async function (next) {
    //check mk đã băm hay chưa
    if (!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
const User = mongooes.model("User", userEntity)
=======
const mongooes = require("mongoose")
const bcrypt = require('bcryptjs')
const userEntity = mongooes.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    friends: [
        {
            friend: {
                type: mongooes.Schema.Types.ObjectId,
                ref: "User"
            },
            sender: {
                type: mongooes.Schema.Types.ObjectId,
                ref: "User"
            },
            accept: {
                type: Boolean
            }
        }
    ]
}, {
    TimeStamp: true
})
userEntity.methods.matchPassword = async function (enteredPassword) {
    // console.log("entered", enteredPassword);
    // console.log(this.password);
    return await bcrypt.compare(enteredPassword, this.password);
};
userEntity.pre("save", async function (next) {
    //check mk đã băm hay chưa
    if (!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
userEntity.pre("findOneAndUpdate", async function (next) {
    //check mk đã băm hay chưa
    if (!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
const User = mongooes.model("User", userEntity)
>>>>>>> main
module.exports = User