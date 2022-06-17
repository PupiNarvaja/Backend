const router = require("express").Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const logger = require('../log')

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
        res.status(200).send(greeting)
    })
})


module.exports = router;