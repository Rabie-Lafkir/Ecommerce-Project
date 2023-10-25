const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');
//const { authenticateCustomer } = require('../middleware/authMiddleware'); // Adjust the path based on your project structure

// Use the authenticateCustomer middleware for the /products route
router.get('/orders', (req, res) => {
  // Your route logic here
});

// Other routes...



// Create a new order
router.post('/', orderController.createOrder);

// Middleware for authenticating the customer
function authenticateCustomer(req, res, next) {
  const token = req.headers.authorization;

  // Check if the token is a valid bearer token
  if (!token || !token.startsWith('Bearer ')) {
      return res.status(403).json({ status: 403, message: 'Invalid or missing authentication token' });
  }

  // Mocked example: In a real-world application, you'd verify the token and validate the email.
  const userID = req.body.userID;
  const isEmailValidated = validateEmail(userID);

  if (!isEmailValidated) {
      return res.status(403).json({ status: 403, message: 'Email not validated' });
  }

  // Continue if the user is authenticated and email is validated
  next();
}

// Mocked email validation function (replace with actual email validation logic)
function validateEmail(userID) {
  // Example: Check if the user's email is validated
  // You should implement your own logic for email validation
  return true; // Mocked as validated for this example
}

// List all orders with pagination support
router.get('/', orderController.listOrders);

// Get an order by ID
router.get('/:id', orderController.getOrderById);

// Update the order status
router.put('/:id', orderController.updateOrderStatus);

module.exports = router;

