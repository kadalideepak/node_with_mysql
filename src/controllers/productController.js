const Product = require("../models/productModel");

exports.addProduct = (req, res) => {
  const { product_name, product_description, price, size, quantity } = req.body;

  Product.createProduct(
    product_name,
    product_description,
    price,
    size,
    quantity,
    (err, result) => {
      if (err) return res.status(500).send(err);
      res
        .status(201)
        .json({ message: "Product created successfully", data: result });
    }
  );
};

exports.getAllProducts = (req, res) => {
  Product.getAllProducts((err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
};

exports.getProductById = (req, res) => {
  const { id } = req.params;

  Product.getProductById(id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0)
      return res
        .status(404)
        .json({ message: `Product with ID ${id} not found` });
    res.status(200).json(results[0]);
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { product_name, product_description, price, size, quantity } = req.body;

  Product.updateProduct(
    id,
    product_name,
    product_description,
    price,
    size,
    quantity,
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).json({ message: "Product updated successfully" });
    }
  );
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  Product.deleteProduct(id, (err, result) => {
    if (err) return res.status(500).send(err);
    res
      .status(200)
      .json({ message: `Product with ID ${id} deleted successfully` });
  });
};
