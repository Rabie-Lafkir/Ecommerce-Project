const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');
const { authenticateCustomer } = require('../Middlewares/authMiddleware'); // Correct the path to authMiddleware

// List all orders with pagination support
router.get('/', authenticateCustomer, orderController.listOrders);

// Get an order by ID
router.get('/:id', authenticateCustomer, orderController.getOrderById);

// Create a new order
router.post('/', authenticateCustomer, orderController.createOrder);

// Update the order status
router.put('/:id', authenticateCustomer, orderController.updateOrderStatus);

module.exports = router;

