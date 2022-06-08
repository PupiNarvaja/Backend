const router = require("express").Router()
const isLogged = require("../middlewares/isLogged")

// /logout
router.get("/", (req, res) => { // TEMPORAL.
    res.redirect("/")
})

router.post("/", isLogged, (req, res, next) => {
    const { firstname, lastname } = req.user

    const greeting = `Goodbye ${firstname} ${lastname}! <br><a href="/">Login</a>`

    res.clearCookie("token")
    
    req.logOut((err) => {
        if (err) {
            console.log(err)
            return next(err)
        }
        res.status(200).send(greeting)
    })
})


module.exports = router;