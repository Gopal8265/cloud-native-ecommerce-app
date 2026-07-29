const express = require("express");
const router = express.Router();

const productController = require("./product.controller");
const authenticateToken = require("../middleware/auth.middleware");

// Create Product
router.post("/", authenticateToken, productController.createProduct);

// Get All Products
router.get("/", productController.getAllProducts);

// Get Product By ID
router.get("/:id", productController.getProductById);

// Update Product
router.put("/:id", authenticateToken, productController.updateProduct);

// Delete Product
router.delete("/:id", authenticateToken, productController.deleteProduct);

module.exports = router;