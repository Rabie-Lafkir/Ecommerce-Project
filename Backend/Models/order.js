const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
            },
        },
    ],
    total: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    orderStatus: {
        type: String,
        enum: ['Open', 'Shipped', 'Paid', 'Closed', 'Canceled'],
        default: 'Open',
    },
    id: {
        type: String,
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Customer model
        ref: 'Customer',
    },
    order_items: {
        type: [String],
    },
    order_date: {
        type: Date,
    },
    cart_total_price: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['Open', 'Shipped', 'Paid', 'Closed', 'Canceled'],
    },
});

module.exports = mongoose.model('Order', orderSchema);
