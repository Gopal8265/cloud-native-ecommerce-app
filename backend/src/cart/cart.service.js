const pool = require("../config/db");

// Add Product to Cart
const addToCart = async (userId, productId, quantity) => {
  const product = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [productId]
  );

  if (product.rows.length === 0) {
    throw new Error("Product not found");
  }

  const existing = await pool.query(
    "SELECT * FROM cart WHERE user_id = $1 AND product_id = $2",
    [userId, productId]
  );

  if (existing.rows.length > 0) {
    const updated = await pool.query(
      `UPDATE cart
       SET quantity = quantity + $1
       WHERE user_id = $2 AND product_id = $3
       RETURNING *`,
      [quantity, userId, productId]
    );

    return updated.rows[0];
  }

  const result = await pool.query(
    `INSERT INTO cart (user_id, product_id, quantity)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, productId, quantity]
  );

  return result.rows[0];
};

// View Cart
const getCart = async (userId) => {
  const result = await pool.query(
    `SELECT
      c.id AS cart_id,
      p.id AS product_id,
      p.name,
      p.category,
      p.description,
      p.price,
      p.image_url,
      c.quantity,
      (p.price * c.quantity) AS total_price
     FROM cart c
     JOIN products p ON c.product_id = p.id
     WHERE c.user_id = $1
     ORDER BY c.id`,
    [userId]
  );

  return result.rows;
};

// Update Cart
const updateCart = async (cartId, userId, quantity) => {
  const result = await pool.query(
    `UPDATE cart
     SET quantity = $1
     WHERE id = $2 AND user_id = $3
     RETURNING *`,
    [quantity, cartId, userId]
  );

  return result.rows[0];
};

// Delete Cart Item
const deleteCartItem = async (cartId, userId) => {
  const result = await pool.query(
    `DELETE FROM cart
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [cartId, userId]
  );

  return result.rows[0];
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  deleteCartItem,
};