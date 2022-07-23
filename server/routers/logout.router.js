const router = require("express").Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const UniversalController = require("../controllers/universal.controller")
const LogoutController = require("../controllers/logout.controller")

// "/logout"
router.get("/", UniversalController.redirectToHome) // It redirects to homepage.

router.post("/", isAuthenticated, LogoutController.logout) // It clears the "token" cookie, logs out the user and sends a logout message.

module.exports = router