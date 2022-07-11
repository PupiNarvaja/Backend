const router = require("express").Router()
const UniversalController = require("../../controllers/universal.controller")
const isAuthenticated = require("../../middlewares/isAuthenticated")
const isAdmin = require("../../middlewares/isAdmin")

// "/admin"
router.use(isAuthenticated)
router.use(isAdmin)

router.get("/", UniversalController.sendIndex)

module.exports = router