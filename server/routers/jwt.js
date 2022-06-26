const router = require("express").Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const { generateToken } = require("../auth/jwt")
const logger = require("../log/winston")

// /auth/jwt  QUIZAS ACA VA EL AUTH DE PASSPORT QUE BORRE.
router.get("/", (req, res) => {
    if (!req.user) {
        logger.error("No user from /auth/jwt")
        res.redirect("/login")
    } else {
        logger.info("Generating token...")
        const token = generateToken(req.user)
        logger.info(JSON.stringify(req.user))
        res.clearCookie("token")
        res.cookie("token", token)// , { httpOnly: true }
    
        logger.warn("Should redirect here.")
        res.redirect("/")
    }
})



module.exports = router