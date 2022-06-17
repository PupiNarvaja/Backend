const router = require("express").Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const { generateToken } = require("../auth/jwt")
const logger = require("../log/winston")

// /auth/jwt
router.get("/", (req, res) => {
    if (!req.user) {
        res.redirect("/login")
    } else {
        const token = generateToken(req.user)
        res.clearCookie("token")
        res.cookie("token", token)// , { httpOnly: true }
    
        res.redirect("/")
    }
})



module.exports = router