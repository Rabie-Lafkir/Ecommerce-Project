const mongoose = require('mongoose');
const Order = require('../Models/order');
const Customer = require('../Models/customer'); // Import the Customer model directly
const Product = require('../Models/product'); // Import the Customer model directly

const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const prefix = 'ORD';
  const orderNumber = `${prefix}-${timestamp}-${random}`;
  return orderNumber;
};





createOrder = async (req, res) => {
  try {
    const { customer_id, order_items, cartTotalPrice, address, payment } = req.body;
    const orderNumber = generateOrderNumber();

    if (!customer_id || !order_items || !cartTotalPrice || !orderNumber || !address || !payment ) {
      return res.status(400).json({ message: "Missing field" });
    }

    let customerId;
    let products;
    console.log("customer_id ",customer_id)
    try {
      customerId = await Customer.findOne({ _id: customer_id });

      if (!customerId) {
        return res.status(404).json({ message: "Customer id not found" });
      }
    } catch (error) {
      if (error instanceof CastError) {
        return res.status(400).json({ message: "Invalid customer id format" });
      }
      throw error; // Re-throw other errors
    }

    if (!Array.isArray(order_items) || order_items.length === 0) {
      return res.status(400).json({ message: "Order items must be an array and not empty" });
    }
    console.log("order_items :",order_items)
    const invalidProductIds = [];

   

    const newOrder = new Order({
      customer_id: customerId._id,
      order_items,
      cartTotalPrice,
      orderNumber,
      address,
      payment
    });

    await newOrder.save();
    console.log("newOrder:", newOrder);

    res.status(201).json({ message: "Order created successfully", newOrder });
  } catch (err) {
    console.error("Error in creating order: " + err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const Customers = require('../Models/customer'); 

const listOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'customer_id',
        model: Customers,
        select: 'first_name last_name email', 
      })
      .populate({
        path: 'order_items.product',
        model: 'Product', 
        select: 'name', 
      });

    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      orderNumber: order.orderNumber || 'N/A',
      status: order.status || 'N/A',
      customerFirstName: order.customer_id ? order.customer_id.first_name : 'Unknown',
      customerLastName: order.customer_id ? order.customer_id.last_name : 'Unknown',
      order_items: order.order_items,
      orderDate: order.orderDate,
      cartTotalPrice: order.cartTotalPrice,
    }));

    res.status(200).json({ status: 200, data: formattedOrders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ status: 500, error: 'Failed to fetch orders' });
  }
};



// Get an order by ID
const getOrderById = async (req, res) => {
  try {
      const orderId = req.params.id;

      if (!orderId) {
          return res.status(400).json({ status: 400, message: 'Invalid order ID' });
      }

      const order = await Order.findById(orderId).populate('customer_id'); // Populate the customer_id field

      if (!order) {
          return res.status(404).json({ status: 404, message: 'Order not found' });
      }

      if (!order.customer_id) {
          return res.status(404).json({ status: 404, message: 'Customer ID not found in the order' });
      }

      const customer = order.customer_id;

      // Define and prepare the response data
      const responseData = {
          _id: order._id,
          customer_id: customer._id, // Updated field name
          customerFirstName: customer.firstName,
          customerLastName: customer.lastName,
          orderItems: order.order_items, // Updated field name
          orderDate: order.order_date, // Updated field name
          cartTotalPrice: order.cart_total_price, // Updated field name
          status: order.status,
      };

      res.status(200).json({ status: 200, data: responseData });
  } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
  }
}

// Update the order status
const updateOrderStatus = async (req, res) => {
  try {
      const userRole = req.user.role; 

      // if (userRole !== 'admin' && userRole !== 'manager') {
      //     return res.status(403).json({ status: 403, message: 'You don\'t have enough privilege' });
      // }

      const orderId = req.params.id;
      const { status } = req.body;

      const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

      if (!order) {
          return res.status(404).json({ status: 404, message: 'Invalid order ID' });
      }

      res.status(200).json({ status: 200, message: 'Order status updated successfully' });
  } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
  }
};

const getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({});
    res.status(200).json( totalOrders );
  } catch (error) {
    console.error('Error getting total orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {
  createOrder,
  listOrders,
  getOrderById,
  updateOrderStatus,
  getTotalOrders
};

