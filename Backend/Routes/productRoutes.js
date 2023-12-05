const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');
const { validateToken } = require('../Middlewares/authMiddleware');


const {upload} = require('../Middlewares/uploadMiddleware');

//total
router.get('/totalproducts',productController.getTotalProducts);
// Create a new product
router.post('/',upload.single('product_image'),productController.createProduct);


// List all the products
router.get('/', productController.listProducts);

// Search for a product
router.get('/search', productController.searchProducts);

// Get a product by ID
router.get('/:id', productController.getProductById);

// Update product data by ID
router.patch('/:id',upload.single('product_image'), productController.updateProduct);

// Delete a product by ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
