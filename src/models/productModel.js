const db = require("../../config/db");

module.exports = {
  createProduct: (
    product_name,
    product_description,
    price,
    size,
    quantity,
    callback
  ) => {
    const sql = `
      INSERT INTO products (product_name, product_description, price, size, quantity)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [product_name, product_description, price, size, quantity],
      callback
    );
  },

  getAllProducts: (callback) => {
    db.query("SELECT * FROM products", callback);
  },

  getProductById: (id, callback) => {
    db.query("SELECT * FROM products WHERE id = ?", [id], callback);
  },

  updateProduct: (
    id,
    product_name,
    product_description,
    price,
    size,
    quantity,
    callback
  ) => {
    const sql = `
      UPDATE products
      SET product_name=?, product_description=?, price=?, size=?, quantity=?
      WHERE id=?
    `;
    db.query(
      sql,
      [product_name, product_description, price, size, quantity, id],
      callback
    );
  },

  deleteProduct: (id, callback) => {
    db.query("DELETE FROM products WHERE id=?", [id], callback);
  },
};
