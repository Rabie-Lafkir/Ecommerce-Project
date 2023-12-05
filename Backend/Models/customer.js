const mongoose = require('mongoose');



const customersSchema = mongoose.Schema({
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      email: { type: String, required: true },
      password: {
        type: String,
        required: true
      },
      creation_date: { type: Date, default: Date.now },
      last_login: { type: Date, default: null },
      active: { type: Boolean, default: false },
      activationToken:{type:String,default:null},
    
})

const Customers = mongoose.model("Customers", customersSchema);
module.exports=Customers;