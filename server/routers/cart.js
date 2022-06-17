const router = require("express").Router()
const cartController = require("../controllers/cart");
const isAuthenticated = require("../middlewares/isAuthenticated");

//  /api/cart
router.post("/", isAuthenticated, cartController.createCart); // Crea un nuevo cart con id propio.

router.delete("/:id", isAuthenticated, cartController.deleteCart); // Elimina un cart por completo.

router.get("/:id/products", isAuthenticated, cartController.getCartProducts); // Obtiene todos los productos de un cart determinado.

router.post("/:id/products/:prodId", isAuthenticated, cartController.addProduct); // Agrega un nuevo producto (body) a un carrito determinado por su id.

router.delete("/:id/products/:prod", isAuthenticated, cartController.deleteProduct); // Elimina un producto determinado de un carrito determinado.

module.exports = router;
