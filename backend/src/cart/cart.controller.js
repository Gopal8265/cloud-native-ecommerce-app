const cartService = require("./cart.service");

// Add Product to Cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cartItem = await cartService.addToCart(
      userId,
      productId,
      quantity
    );

    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: cartItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// View Cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await cartService.getCart(userId);

    res.status(200).json({
      success: true,
      count: cartItems.length,
      data: cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Cart Quantity
const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartId = req.params.id;
    const { quantity } = req.body;

    const updatedCart = await cartService.updateCart(
      cartId,
      userId,
      quantity
    );

    if (!updatedCart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Cart Item
const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartId = req.params.id;

    const deletedItem = await cartService.deleteCartItem(
      cartId,
      userId
    );

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  deleteCartItem,
};