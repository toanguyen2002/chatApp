const express = require('express')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = express.Router()

const { sendMessage, allMessages, sendMessImage, blacnkMess, deleteMess } = require("../Controllers/MessageController")
const { protect } = require("../middleware/auth")


router.route("/:chatId").get(protect, allMessages)
router.route("/").post(protect, sendMessage)
router.route("/blankMess").post(protect, blacnkMess)
router.route("/deleteMess").post(protect, deleteMess)
router.post("/messImage", upload.single("fileImage"), sendMessImage)


module.exports = router
