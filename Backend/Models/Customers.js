const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");
const md5 = require("md5");

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
        required: true,
        set: function (password) {
          // Hashing the password using md5 before saving it to the database
          return md5(password);
        },
      },
      creation_date: { type: Date, default: Date.now },
      last_login: { type: Date, default: null },
      active: { type: Boolean, default: false }
    
})

const Customers = mongoose.model("Customers", customersSchema);
module.exports = Customers;
