const { generateToken } = require("../auth/jwt")
const logger = require("../log")

const generateTokenAndRedirect = (req, res) => {
    logger.info("Generating token for " + req.user.name)
    const token = generateToken(req.user)

    res.clearCookie("token")
    res.cookie("token", token)// , { httpOnly: true }

    logger.info("Redirecting...")
    res.send(token).status(200) // Probar cambiar todos los fetchs por axios y ahi probar la antigua forma de interceptar el token y eso
}

module.exports = {
    generateTokenAndRedirect
}