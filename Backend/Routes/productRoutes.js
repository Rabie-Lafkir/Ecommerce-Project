const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');
const { validateToken } = require('../Middlewares/authMiddleware');

// Create a new product
router.post('/',productController.createProduct);

// List all the products
router.get('/', productController.listProducts);

// Search for a product
router.get('/search', validateToken, productController.searchProducts);

// Get a product by ID
router.get('/:id', validateToken, productController.getProductById);

// Update product data by ID
router.patch('/:id', validateToken, productController.updateProduct);

// Delete a product by ID
router.delete('/:id', validateToken, productController.deleteProduct);

module.exports = router;
