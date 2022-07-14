const { generateToken } = require("../auth/jwt")
const logger = require("../log")

const generateTokenAndRedirect = (req, res) => {
    logger.info("Generating token...")
    const token = generateToken(req.user)

    res.clearCookie("token")
    res.cookie("token", token)// , { httpOnly: true }

    logger.info("Redirecting...")
    res.redirect("/") // Probar cambiar todos los fetchs por axios y ahi probar la antigua forma de interceptar el token y eso
}

module.exports = {
    generateTokenAndRedirect
}