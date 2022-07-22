const router = require("express").Router()
const cartController = require("../../controllers/cart")
const isAuthenticated = require("../../middlewares/isAuthenticated")

//  "/api/cart"
router.use(isAuthenticated)

router.get("/", cartController.getCartProducts) // Obtiene todos los productos de un cart determinado.

router.post("/:prodId", cartController.addProduct) // Agrega un nuevo producto a un carrito determinado.

router.delete("/:prodId", cartController.deleteProduct) // Elimina un producto determinado de un carrito determinado.

router.put("/:operation/:prodId", cartController.modifyQuantity) // Modifica la cantidad de un producto dentro del carrito.

//router.delete("/:id", cartController.deleteCart) // Elimina un cart por completo.

module.exports = router
