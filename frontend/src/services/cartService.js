import API from "../api/axios";

// Get Cart Items
export const getCart = async () => {
  const response = await API.get("/cart");
  return response.data;
};

// Add Product to Cart
export const addToCart = async (productId, quantity = 1) => {
  const response = await API.post("/cart", {
    productId: productId,
    quantity,
  });

  return response.data;
};

// Update Cart Quantity
export const updateCart = async (cartId, quantity) => {
  const response = await API.put(`/cart/${cartId}`, {
    quantity,
  });

  return response.data;
};

// Remove Product from Cart
export const removeCartItem = async (cartId) => {
  const response = await API.delete(`/cart/${cartId}`);
  return response.data;
};