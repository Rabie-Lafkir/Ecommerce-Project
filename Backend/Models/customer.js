const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Add other fields as needed (e.g., address, phone number, etc.)
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer; // Export Customer directly
