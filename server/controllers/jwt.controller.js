const { generateToken } = require("../auth/jwt")
const logger = require("../log/winston")

const generateTokenAndRedirect = (req, res) => {
    logger.info("Generating token...")
    const token = generateToken(req.user)

    res.clearCookie("token")
    res.cookie("token", token)// , { httpOnly: true }

    logger.info("Redirecting...")
    res.redirect("/")
}

module.exports = {
    generateTokenAndRedirect
}