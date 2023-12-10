const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  order_items: [
    {
      type: Array,
    },
  ],
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
    enum: ["Open", "Shipped", "Paid", "Closed", "Canceled"],
    default: "Open",
  },

  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
