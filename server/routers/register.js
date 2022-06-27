const router = require("express").Router()
const passport = require("passport")
const path = require("path")

// /register
router.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../../client/dist", "index.html"))
})

router.post("/", passport.authenticate("register", {
    successRedirect: "/auth/jwt",
    failureRedirect: "/register"
}))


module.exports = router;