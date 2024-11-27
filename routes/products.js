const express = require("express");
const { authentication } = require("../middleware/authentication");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

// Crear producto (requiere autenticación)
router.post("/create", authentication, ProductController.create);

// Obtener producto por ID
router.get("/id/:id", ProductController.getById);

// Actualizar producto por ID (requiere autenticación)
router.put("/id/:id", authentication, ProductController.update);

// Eliminar producto por ID (requiere autenticación)
router.delete("/id/:id", authentication, ProductController.delete);

// Buscar producto por nombre
router.get("/name/:name", ProductController.getByName);

// Buscar productos por rango de precios
router.get("/price", ProductController.getByPrice); // Si usas parámetros en la query como minPrice y maxPrice

module.exports = router;