const pool = require("../config/db");

// Place Order
const placeOrder = async (userId) => {
  // Get cart items
  const cartResult = await pool.query(
    `SELECT
        c.product_id,
        c.quantity,
        p.price
     FROM cart c
     JOIN products p ON c.product_id = p.id
     WHERE c.user_id = $1`,
    [userId]
  );

  const cartItems = cartResult.rows;

  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Create order
  const orderResult = await pool.query(
    `INSERT INTO orders (user_id, total_amount)
     VALUES ($1, $2)
     RETURNING *`,
    [userId, totalAmount]
  );

  const order = orderResult.rows[0];

  // Insert order items
  for (const item of cartItems) {
    await pool.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price)
       VALUES ($1, $2, $3, $4)`,
      [order.id, item.product_id, item.quantity, item.price]
    );
  }

  // Clear cart
  await pool.query(
    `DELETE FROM cart WHERE user_id = $1`,
    [userId]
  );

  return order;
};

// Get All Orders of Logged-in User
const getOrders = async (userId) => {
  const result = await pool.query(
    `SELECT *
     FROM orders
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};

// Get Single Order By ID
const getOrderById = async (orderId, userId) => {
  const result = await pool.query(
    `SELECT
        o.id,
        o.total_amount,
        o.status,
        o.created_at,
        oi.product_id,
        p.name,
        p.price,
        oi.quantity
     FROM orders o
     JOIN order_items oi ON o.id = oi.order_id
     JOIN products p ON oi.product_id = p.id
     WHERE o.id = $1
       AND o.user_id = $2`,
    [orderId, userId]
  );

  return result.rows;
};

module.exports = {
  placeOrder,
  getOrders,
  getOrderById,
};