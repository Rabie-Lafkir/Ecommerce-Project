const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');
const { validateToken } = require('../Middlewares/authMiddleware');

// List all orders with pagination support
router.get('/', validateToken, orderController.listOrders);

// Get an order by ID
router.get('/:id', validateToken, orderController.getOrderById);

// Create a new order
router.post('/', validateToken, orderController.createOrder);

// Update the order status
router.put('/:id', validateToken, orderController.updateOrderStatus);

module.exports = router;

