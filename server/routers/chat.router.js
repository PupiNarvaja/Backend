const router = require("express").Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const chatController = require("../controllers/chat.controller")

// "/chat"
router.get("/", isAuthenticated, chatController.sendChatView)

module.exports = router