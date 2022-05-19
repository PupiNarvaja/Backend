const { Router } = require("express");
const router = Router();
const Controller = require("../controllers/products");

// /api/products
router.get("/", Controller.getAllProducts) // Obtiene todos los productos existentes.

router.get("/:id", Controller.getProduct) // Obtiene un producto determinado.

router.post("/", Controller.addProduct) // Agrega un nuevo producto.

router.put("/:id", Controller.updateProduct) // Modifica un producto existente.

router.delete("/:id", Controller.deleteProduct) // Elimina un producto.




module.exports = router;

// Clases para persistencia. Controllers para métodos. Routers para rutas.

// Código: rutas, controllers y modelos.