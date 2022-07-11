const router = require("express").Router()
const UniversalController = require("../../controllers/universal.controller")
const isAuthenticated = require("../../middlewares/isAuthenticated")
const isAdmin = require("../../middlewares/isAdmin")

// "/admin"
router.use(isAuthenticated)
router.use(isAdmin)

//router.get("/", UniversalController.sendIndex) // CREAR EN REACT PANTALLA ADMIN

router.get("/products", UniversalController.sendIndex)

router.get("/users", UniversalController.sendIndex)

router.get("/orders", UniversalController.sendIndex)

module.exports = router