const router = require("express").Router()
const cartController = require("../../controllers/cart")
const isAuthenticated = require("../../middlewares/isAuthenticated")

//  /api/cart
router.get("/", isAuthenticated, cartController.getCartProducts); // Obtiene todos los productos de un cart determinado.

router.post("/:prodId", isAuthenticated, cartController.addProduct); // Agrega un nuevo producto a un carrito determinado.

router.delete("/:prodId", isAuthenticated, cartController.deleteProduct); // Elimina un producto determinado de un carrito determinado.

//router.delete("/:id", isAuthenticated, cartController.deleteCart); // Elimina un cart por completo.

module.exports = router;
