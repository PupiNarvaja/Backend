const router = require("express").Router()
const isLogged = require("../middlewares/isLogged")
const { generateToken } = require("../auth/jwt")

// /auth/jwt
router.get("/", isLogged, (req, res) => {
    const token = generateToken(req.user)
    res.clearCookie("token")
    res.cookie("token", token)// , { httpOnly: true }

    res.redirect("/api/products/show")
})



module.exports = router