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
    enum: ["Open", "Shipped", "Paid", "Closed", "Canceled","Pending"],
    default: "Pending",
  },

  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },

  address:{
    type: String,
  },

  payment:{
    type: String,
  },


});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
