const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        //required: true,
    },
    product_image: {
        type: String,
        //required: true,
    },
    product_name: {
        type: String,
        //required: true,
    },
    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategories",
      },
    short_description: {
        type: String, // Corrected from "text"
        //required: true,
    },
    long_description: {
        type: String, // Corrected from "text"
        //required: false, // Optional field
    },
    price: {
        type: Number, // Corrected from "number"
        //required: true,
    },
    discount_price: {
        type: Number, // Corrected from "number"
       // required: false, // Optional field
    },
    options: {
        type: String, // You should specify the data type for "options" (e.g., it could be an array of strings)
        //required: true,
    },
    active: {
        type: Boolean,
        //required: false,
    }
});

module.exports = {Product:mongoose.model('Product', productSchema)};

