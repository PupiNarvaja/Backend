const { Router } = require("express");
const router = Router();
const cartController = require("../controllers/cart");

//  /api/cart
router.post("/", cartController.createCart); // Crea un nuevo cart con id propio.

router.delete("/:id", cartController.deleteCart); // Elimina un cart por completo.

router.get("/:id/products", cartController.getCartProducts); // Obtiene todos los productos de un cart determinado.

router.post("/:id/products/:prodId", cartController.addProduct); // Agrega un nuevo producto (body) a un carrito determinado por su id.

router.delete("/:id/products/:prod", cartController.deleteProduct); // Elimina un producto determinado de un carrito determinado.

module.exports = router;
