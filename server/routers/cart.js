const router = require("express").Router()
const cartController = require("../controllers/cart");
const isLogged = require("../middlewares/isLogged");

//  /api/cart
router.post("/", isLogged, cartController.createCart); // Crea un nuevo cart con id propio.

router.delete("/:id", isLogged, cartController.deleteCart); // Elimina un cart por completo.

router.get("/:id/products", isLogged, cartController.getCartProducts); // Obtiene todos los productos de un cart determinado.

router.post("/:id/products/:prodId", isLogged, cartController.addProduct); // Agrega un nuevo producto (body) a un carrito determinado por su id.

router.delete("/:id/products/:prod", isLogged, cartController.deleteProduct); // Elimina un producto determinado de un carrito determinado.

module.exports = router;
