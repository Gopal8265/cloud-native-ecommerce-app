const express = require("express");
const router = express.Router();

const cartController = require("./cart.controller");
const authenticateToken = require("../middleware/auth.middleware");

// Add Product to Cart
router.post("/", authenticateToken, cartController.addToCart);

// View Cart
router.get("/", authenticateToken, cartController.getCart);

// Update Cart Quantity
router.put("/:id", authenticateToken, cartController.updateCart);

// Delete Cart Item
router.delete("/:id", authenticateToken, cartController.deleteCartItem);

module.exports = router;