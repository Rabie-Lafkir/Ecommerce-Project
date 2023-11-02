const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');
const { authenticateUser } = require('../Middlewares/authMiddleware');

// Create a new product
router.post('/', authenticateUser, productController.createProduct);

// List all the products
router.get('/', authenticateUser, productController.listProducts);

// Search for a product
router.get('/search', authenticateUser, productController.searchProducts);

// Get a product by ID
router.get('/:id', authenticateUser, productController.getProductById);

// Update product data by ID
router.patch('/:id', authenticateUser, productController.updateProduct);

// Delete a product by ID
router.delete('/:id', authenticateUser, productController.deleteProduct);

module.exports = router;
