const { Router } = require("express");
const router = Router();
const Controller = require("../controllers/cart");

//  /api/cart
router.post("/", Controller.createCart); // Crea un nuevo cart con id propio.

router.delete("/:id", Controller.deleteCart); // Elimina un cart por completo.

router.get("/:id/products", Controller.getCartProducts); // Obtiene todos los productos de un cart determinado.

router.post("/:id/products", Controller.addProduct); // Agrega un nuevo producto (body) a un carrito determinado por su id.

router.delete("/:id/products/:prod", Controller.deleteProduct); // Elimina un producto determinado de un carrito determinado.

module.exports = router;
