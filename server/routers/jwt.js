const router = require("express").Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const { generateToken } = require("../auth/jwt")

// /auth/jwt
router.get("/", isAuthenticated, (req, res) => {
    const token = generateToken(req.user)
    res.clearCookie("token")
    res.cookie("token", token)// , { httpOnly: true }

    res.redirect("/api/products/show")
})



module.exports = router