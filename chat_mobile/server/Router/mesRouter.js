const express = require('express')
const router = express.Router()

const { sendMessage, allMessages } = require("../Controllers/MessageController")
const { protect } = require("../middleware/auth")


router.route("/:chatId").get(protect, allMessages)
router.route("/").post(protect, sendMessage)


module.exports = router
