const asynceHandle = require("express-async-handler")
const Chat = require("../Entity/chatEntity")
const User = require("../Entity/userEntity")


const { protect } = require("../middleware/auth")
const { fetchChats, accessChat, createGroupChat, fetchGroups, renameGroupChat, addUserToGroup, removeUserFromGroup } = require("../Controllers/chatController")

const express = require("express")
const Router = express.Router();

Router.post("/", protect, accessChat)
Router.route("/").get(protect, fetchChats)
Router.route("/createGroupChat").post(protect, createGroupChat)
Router.route("/renameGroupChat").post(protect, renameGroupChat)
Router.route("/addUserToGroupChat").post(protect, addUserToGroup)
Router.route("/removeUserFromGroup").post(protect, removeUserFromGroup)
// router.route("/fetchGroups").get(protect, fetchGroups)
// router.route("/").post(protect, fetchChats)


module.exports = Router