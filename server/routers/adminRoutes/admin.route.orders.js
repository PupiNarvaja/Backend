const router = require("express").Router()
const path = require("path")
const isAuthenticated = require("../../middlewares/isAuthenticated")
const isAdmin = require("../../middlewares/isAdmin")

// /admin/orders
router.get("/", isAuthenticated, isAdmin, (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../../../client/dist", "index.html"))
})

module.exports = router