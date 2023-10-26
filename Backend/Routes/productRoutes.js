const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {
  createProduct,
  listProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductById,
} = require('../Controllers/productController');
const { authenticateUser } = require('../Middlewares/authMiddleware'); // Adjust the path based on your project structure



// Create a new product
router.post('/', createProduct);

// List all the products
router.get('/', listProducts);

// Search for a product 
router.get('/search', searchProducts);

// Get a product by ID
router.get('/:id', getProductById);

// Update product data by ID
router.patch('/:id', updateProduct);

// Delete a product by ID
router.delete('/:id', deleteProduct);

module.exports = router;

