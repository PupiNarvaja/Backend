const router = require("express").Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const logger = require('../log')
const path = require("path")

// /logout
router.get("/", (req, res) => { // TEMPORAL.
    res.redirect("/")
})

router.post("/", isAuthenticated, (req, res, next) => {
    const { firstname, lastname } = req.user

    const greeting = `Goodbye ${firstname} ${lastname}! <br><a href="/login">Login</a>`

    res.clearCookie("token")
    
    req.logOut((err) => {
        if (err) {
            logger.error(err)
            return next(err)
        }
        res.status(200).sendFile(path.join(__dirname, "../views/logout.html"))
    })
})


module.exports = router;