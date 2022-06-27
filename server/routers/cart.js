const router = require("express").Router()
const path = require("path")
const isAuthenticated = require("../middlewares/isAuthenticated")

//  /cart
router.get("/", isAuthenticated, (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../../client/dist", "index.html"))
    // const total = cart.reduce((total, p) => total + p.price, 0)
})

module.exports = router