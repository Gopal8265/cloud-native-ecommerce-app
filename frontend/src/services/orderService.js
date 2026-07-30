import API from "../api/axios";

// Place Order
export const placeOrder = async () => {
  const response = await API.post("/orders");
  return response.data;
};

// Get All Orders
export const getOrders = async () => {
  const response = await API.get("/orders");
  return response.data;
};

// Get Order By ID
export const getOrderById = async (orderId) => {
  const response = await API.get(`/orders/${orderId}`);
  return response.data;
};