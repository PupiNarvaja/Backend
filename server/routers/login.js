const router = require("express").Router()
const passport = require("passport")
const UniversalController = require("../controllers/universal.controller")

// "/login"
router.get("/", UniversalController.sendIndex)

router.post("/", passport.authenticate("login", {
    successRedirect: "/auth/jwt",
    failureRedirect: "/login"
}))

module.exports = router