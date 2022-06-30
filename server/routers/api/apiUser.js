const router = require("express").Router()

const isAuthenticated = require("../../middlewares/isAuthenticated")
const userController = require("../../controllers/user")

// /api/user
router.get("/", isAuthenticated, userController.getUser) // Obtiene información de un usuario determinado.


module.exports = router;