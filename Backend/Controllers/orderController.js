const mongoose = require('mongoose');
const Order = require('../Models/order');
const Customer = require('../Models/customer'); // Import the Customer model directly

// Create a new order
// const createOrder = async (req, res) => {
//     try {
//         // Access the required order details from the request body
//         const {
//             orderNumber,
//             total,
//             date,
//             orderStatus,
//             id,
//             customer_id,
//             order_items,
//             order_date,
//             cart_total_price,
//             status,
//         } = req.body;

//         // Generate valid ObjectId for product IDs
//         const productId1 = new mongoose.Types.ObjectId();
//         const productId2 = new mongoose.Types.ObjectId();

//         // Update the products array with valid product objects
//         const updatedProducts = [
//             {
//                 productId: productId1,
//                 quantity: 1,
//             },
//             {
//                 productId: productId2,
//                 quantity: 10,
//             },
//         ];

//         // Create the order
//         const newOrder = new Order({
//             orderNumber: orderNumber,
//             products: updatedProducts,
//             total: total,
//             date: date,
//             orderStatus: orderStatus,
//             id: id,
//             customer_id: customer_id,    
//             order_items: order_items,
//             order_date: order_date,
//             cart_total_price: cart_total_price,
//             status: status,
//         });

//         await newOrder.save();

//         res.status(201).json({ status: 201, message: 'Order created successfully' });
//     } catch (error) {
//         res.status(400).json({ status: 400, error: error.message });
//     }
// };

const createOrder = async (req, res) => {
    try {
      const {
        orderNumber,
        cartTotalPrice,
        orderDate,
        orderStatus,
        customer_id,
        order_items,
      } = req.body;
  
      // For demonstration purposes, generating placeholder product IDs
      const productId1 = new mongoose.Types.ObjectId();
      const productId2 = new mongoose.Types.ObjectId();
  
      // For demonstration, updating order_items structure
      const updatedOrderItems = [
        {
          productId: productId1,
          quantity: 1,
        },
        {
          productId: productId2,
          quantity: 10,
        },
      ];
  
      const newOrder = new Order({
        orderNumber: orderNumber,
        cartTotalPrice: cartTotalPrice,
        orderDate: orderDate,
        orderStatus: orderStatus,
        customer_id: customer_id,
        order_items: updatedOrderItems,
        // Assuming other fields are not relevant or handled differently
      });
  
      await newOrder.save();
  
      res.status(201).json({ status: 201, message: 'Order created successfully' });
    } catch (error) {
      res.status(400).json({ status: 400, error: error.message });
    }
  };
  

// List all orders with specified criteria
// const listOrders = async (req, res) => {
//   try {
//       const page = parseInt(req.query.page) || 1;
//       const limit = 10;
//       const skip = (page - 1) * limit;

//       const orders = await Order.aggregate([
//           {
//               $lookup: {
//                   from: 'customers', // Assuming the name of the customers collection/table
//                   localField: 'customer_id', // Update to 'customer_id'
//                   foreignField: '_id',
//                   as: 'customerInfo',
//               },
//           },
//           {
//               $unwind: '$customerInfo',
//           },
//           {
//               $project: {
//                   _id: 1,
//                   customer_id: 1, // Update to 'customer_id'
//                   customerFirstName: '$customerInfo.firstName',
//                   customerLastName: '$customerInfo.lastName',
//                   itemsTotal: { $size: '$order_items' },
//                   orderDate: 1,
//                   cartTotalPrice: 1,
//                   status: 1,
//               },
//           },
//       ])
//           .skip(skip)
//           .limit(limit);

//           const formattedOrders = orders.map((order) => ({
//             _id: order._id,
//             orderNumber: order.orderNumber,
//             status: order.orderStatus
//             ,
//           }));

//       res.status(200).json({ status: 200, data: formattedOrders });
//   } catch (error) {
//       res.status(500).json({ status: 500, error: error.message });
//   }
// };

const listOrders = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;
  
      const orders = await Order.aggregate([
        {
          $lookup: {
            from: 'customers',
            localField: 'customer_id',
            foreignField: '_id',
            as: 'customerInfo',
          },
        },
        {
          $unwind: {
            path: '$customerInfo',
            preserveNullAndEmptyArrays: true, // Handles cases where customer_id doesn't match any customer
          },
        },
        {
          $project: {
            orderNumber: 1, // Include orderNumber and orderStatus if they exist in your Order collection
            orderStatus: 1,
            customerFirstName: { $ifNull: ['$customerInfo.first_name', 'Unknown'] }, // Handling missing customer info
            customerLastName: { $ifNull: ['$customerInfo.last_name', 'Unknown'] },
            itemsTotal: { $size: { $ifNull: ['$order_items', []] } }, // Handling missing order_items
            orderDate: 1,
            cartTotalPrice: 1,
            status: 1,
          },
        },
      ])
      .skip(skip)
      .limit(limit);
  
      const formattedOrders = orders.map((order) => ({
        _id: order._id, // If needed
        orderNumber: order.orderNumber || 'N/A', // Ensuring presence of orderNumber
        status: order.orderStatus || 'N/A', // Ensuring presence of orderStatus
        // Other fields as needed
      }));
  
      res.status(200).json({ status: 200, data: orders });
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
      const userRole = req.user.role; // Ensure you are accessing the correct property to get the user's role

      if (userRole !== 'admin' && userRole !== 'manager') {
          return res.status(403).json({ status: 403, message: 'You don\'t have enough privilege' });
      }

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


module.exports = {
  createOrder,
  listOrders,
  getOrderById,
  updateOrderStatus,
};

