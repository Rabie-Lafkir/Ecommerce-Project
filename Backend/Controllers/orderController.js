const mongoose = require('mongoose');
const Order = require('../Models/order');
const { checkOrderPrivilege } = require('../Middlewares/authMiddleware');
const { checkListOrdersPrivilege } = require('../Middlewares/authMiddleware');
const { checkGetOrderByIdPrivilege } = require('../Middlewares/authMiddleware');
const Customer  = require('../Models/customer'); // Import the Customer model directly
const ObjectId = mongoose.Types.ObjectId;



// Create a new order
const createOrder = async (req, res) => {
    try {
        // Access the required order details from the request body
        const {
            orderNumber,
            total,
            date,
            orderStatus,
            id,
            customer_id,
            order_items,
            order_date,
            cart_total_price,
            status,
        } = req.body;

        // Generate valid ObjectId for product IDs
        const mongoose = require('mongoose');
        const productId1 = new mongoose.Types.ObjectId();
        const productId2 = new mongoose.Types.ObjectId();

        // Update the products array with valid product objects
        const updatedProducts = [
            {
                productId: productId1,
                quantity: 1,
            },
            {
                productId: productId2,
                quantity: 10,
            },
        ];

        // Create the order
        const newOrder = new Order({
            orderNumber: orderNumber,
            products: updatedProducts,
            total: total,
            date: date,
            orderStatus: orderStatus,
            id: id,
            customer_id: customer_id,    
            order_items: order_items,
            order_date: order_date,
            cart_total_price: cart_total_price,
            status: status,
        });

        await newOrder.save();

        res.status(201).json({ status: 201, message: 'Order created successfully' });
    } catch (error) {
        res.status(400).json({ status: 400, error: error.message });
    }
};



// List all orders with specified criteria
const listOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const orders = await Order.aggregate([
            {
                $lookup: {
                    from: 'customers', // Assuming the name of the customers collection/table
                    localField: 'customer_id', // Update to 'customer_id'
                    foreignField: '_id',
                    as: 'customerInfo',
                },
            },
            {
                $unwind: '$customerInfo',
            },
            {
                $project: {
                    _id: 1,
                    customer_id: 1, // Update to 'customer_id'
                    customerFirstName: '$customerInfo.firstName',
                    customerLastName: '$customerInfo.lastName',
                    itemsTotal: { $size: '$order_items' },
                    orderDate: 1,
                    cartTotalPrice: 1,
                    status: 1,
                },
            },
        ])
            .skip(skip)
            .limit(limit);

        res.status(200).json({ status: 200, data: orders });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
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

        // Prepare the response data
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
        // Ensure only users with admin and manager roles can access
        const userRole = req.userRole; // Extract user role from the authentication

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

