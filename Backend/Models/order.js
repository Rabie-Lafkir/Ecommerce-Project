const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Existing fields in your Order schema
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // Assuming a reference to the Customer model
    required: true,
  },
  order_items: [/* Define your order items schema here */],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  cartTotalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'], // Define your status values
    default: 'pending',
  },
  // New fields matching the modifications in the code
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  orderStatus: {
    type: String,
    enum: ['created', 'confirmed', 'completed', 'canceled'], // Define your status values
    default: 'created',
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
