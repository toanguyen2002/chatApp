const express = require('express')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = express.Router()

const { sendMessage, allMessages, sendMessImage } = require("../Controllers/MessageController")
const { protect } = require("../middleware/auth")


router.route("/:chatId").get(protect, allMessages)
router.route("/").post(protect, sendMessage)
router.post("/messImage", upload.single("fileImage"), sendMessImage)


module.exports = router
