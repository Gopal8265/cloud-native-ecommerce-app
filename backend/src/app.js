const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Database
require("./config/db");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./auth/auth.routes");
const productRoutes = require("./product/product.routes");
const cartRoutes = require("./cart/cart.routes");
const orderRoutes = require("./orders/order.routes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Cloud Native E-commerce Backend API Running 🚀",
  });
});

module.exports = app;