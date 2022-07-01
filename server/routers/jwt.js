const router = require("express").Router()
const passportAuth = require("../middlewares/passportAuth")
const { generateToken } = require("../auth/jwt")
const logger = require("../log/winston")

// /auth/jwt
router.get("/", passportAuth, (req, res) => {
    if (!req.user) {
        logger.error("No user from /auth/jwt")
        res.redirect("/login")
    } else {
        logger.info("Generating token...")
        const token = generateToken(req.user)

        res.clearCookie("token")
        res.cookie("token", token)// , { httpOnly: true }
    
        logger.info("Redirecting...")
        res.redirect("/")
    }
})



module.exports = router