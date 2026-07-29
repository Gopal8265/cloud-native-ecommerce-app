const pool = require("../config/db");

// Create Product
const createProduct = async (productData) => {
  const { name, description, price, stock, image_url, category } = productData;

  const result = await pool.query(
    `INSERT INTO products
    (name, description, price, stock, image_url, category)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *`,
    [name, description, price, stock, image_url, category]
  );

  return result.rows[0];
};

// Get All Products
const getAllProducts = async () => {
  const result = await pool.query(
    `SELECT * FROM products ORDER BY id ASC`
  );

  return result.rows;
};

// Get Product By ID
const getProductById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM products WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

// Update Product
const updateProduct = async (id, productData) => {
  const { name, description, price, stock, image_url, category } = productData;

  const result = await pool.query(
    `UPDATE products
     SET name=$1,
         description=$2,
         price=$3,
         stock=$4,
         image_url=$5,
         category=$6
     WHERE id=$7
     RETURNING *`,
    [name, description, price, stock, image_url, category, id]
  );

  return result.rows[0];
};

// Delete Product
const deleteProduct = async (id) => {
  const result = await pool.query(
    `DELETE FROM products
     WHERE id=$1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};