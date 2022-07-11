const router = require("express").Router()
const passport = require("passport")
const UniversalController = require("../controllers/universal.controller")

// "/register"
router.get("/", UniversalController.sendIndex)

router.post("/", passport.authenticate("register", {
    successRedirect: "/auth/jwt",
    failureRedirect: "/register"
}))


module.exports = router