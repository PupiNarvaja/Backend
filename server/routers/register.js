const router = require("express").Router()
const passport = require("passport")
const path = require("path") // Hasta usar react con SSR.

// /register
router.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../views/register.html"))
})

router.post("/", passport.authenticate("register", {
    successRedirect: "/auth/jwt",
    failureRedirect: "/register"
}))


module.exports = router;