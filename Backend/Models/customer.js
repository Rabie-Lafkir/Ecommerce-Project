const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");


const customersSchema = mongoose.Schema({
    id: {
        type: String,
        default: uuidv4, 
        unique: true, 
        required: true, 
      },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      email: { type: String, required: true },
      role: { type: String, required: true, default: 'admin' },
      password: {
        type: String,
        required: true
      },
      creation_date: { type: Date, default: Date.now },
      last_login: { type: Date, default: null },
      active: { type: Boolean, default: false }
    
})

const Customers = mongoose.model("Customers", customersSchema);
module.exports=Customers;