const express = require("express");
const router = express.Router();

const orderController = require("./order.controller");
const authenticateToken = require("../middleware/auth.middleware");

// Place Order
router.post("/", authenticateToken, orderController.placeOrder);

// Get All Orders
router.get("/", authenticateToken, orderController.getOrders);

// Get Single Order
router.get("/:id", authenticateToken, orderController.getOrderById);

module.exports = router;