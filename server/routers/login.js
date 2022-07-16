const router = require("express").Router()
const PassportController = require("../controllers/passport.controller")
const UniversalController = require("../controllers/universal.controller")
const jwtController = require("../controllers/jwt.controller")

// "/login"
router.get("/", UniversalController.sendIndex)

router.post("/", PassportController.login, jwtController.generateTokenAndRedirect)

module.exports = router