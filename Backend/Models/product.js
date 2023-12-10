const mongoose = require("mongoose");



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
  categoryLink: {
    type: mongoose.Types.ObjectId,
    ref: 'Categories'},
  short_description: {
    type: String,
  },
  long_description: {
    type: String, 
  },
  price: {
    type: Number, 
  },

quantity: {
  type: Number, 
},
  discount_price: {
    type: Number, 
  },
  options: {
    type: String, 
  },
  active: {
    type: Boolean,
    
  },
  
}
);

module.exports = { Product: mongoose.model("Product", productSchema) };
