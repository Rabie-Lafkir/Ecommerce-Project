const customer = require("../Models/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose=require("mongoose")

require("dotenv").config();

//post creat costumer
const createCustomer = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  console.log(req.body);

  try {
    const hashPassword = await bcrypt.hash(password, 10); // Second argument is the number of salt rounds

    const newCustomer = new customer({
      first_name,
      last_name,
      email,
      password: hashPassword
    });

    await newCustomer.save();

    res.status(201).json({ message: "Customer registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//authenticateCustomer
/*const authenticateCustomer = (req, res, next) => {
  const { email, password } = req.body;

  customer.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        status: 401,
        message: "Invalid credentials",
      });
    }

    const matchPassword = bcrypt.compareSync(password, customer.password);

    if (matchPassword) {
      const token=customer.generateAuthToken();

      const refreshToken = jwt.sign(
        {id: this.__id},
        process.env.refreshKey,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        access_token: token,
        token_type: "jwt",
        expires_in: "1h",
        refresh_token: refreshToken
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: "Invalid credentials",
      });
    }
  });
};*/
const customerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Searching for the user in the database
    const newCustomer = await customer.findOne({ email: email });
    //.select('-password');

    if (!newCustomer) {
      res.status(401).json({ error: "Unauthorized" });
    }

    // Compare hashed passwords using bcrypt.compare
    const passwordMatch = await bcrypt.compare(password, newCustomer.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Unauthorized" });
    }

    // Update the last_login field with the current date and time
    newCustomer.last_login = new Date();
    await newCustomer.save();

    /* Generate a JWT token
      const accessToken = jwt.sign({ customer }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2h",
      });
  
      // Calculate the time left until the token expires
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      const tokenExpiration = Math.floor(jwt.decode(accessToken).exp); // Token expiration time
      const expires_in = tokenExpiration - now;*/

    return res.json({ message: "loged seccusefuly" });

    // Add other user-related information you want to include
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
//get all customers
const getAllCustomers = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
        const perPage = 10; 
    
        try {
          const customers = await customer.find({}).sort({ first_name: -1 }).skip((page - 1) * perPage);
    
        if (customers.length === 0) {
            res.json([]);
        } else {
            res.json(customers);
        }

        } catch (error) {
        console.error('Error retrieving customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
};
//search for Customer
const searchCustomer = async (req, res) => {
  try {
  const queryObject = req.query;

  if (!queryObject.first_name) {
      res.status(400).json('Missing first_name parameter');
      return;
  }
  const search = await customer.find({first_name: { $regex: new RegExp(queryObject.first_name , 'i')}})
  .sort({ first_name: -1 })
  .exec()
  

  if (search.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
  }
  
  res.status(200).json({status:200, data : search});
  
  } catch (error) {
      console.error('Error searching for a customer by first_name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      }
};
//get customer by id

const getCustomer = async (req, res)  => {
      const { id } = req.params
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such customer'})
      }
    
      const customerFound= await customer.findById(id)
    
      if (!customerFound) {
        return res.status(404).json({error: 'No such customer'})
      }
    
      res.status(200).json(customerFound)
    }
    //update customer 
    const updateCustomer = async (req, res) => {
      const { id } = req.params
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          "status": 400,
          "message": "the field xxx should be of type xxx"
        })
      }
    
      const newCustomer = await customer.findOneAndUpdate({_id: id}, {
        ...req.body
      })
    
      if (!newCustomer) {
        return res.status(204).json({error: 'No such new cusomer'})
      }
    
      res.status(200).json({
        "status": 200,
        "message": "customer updated successfully"
      })}
      //delete customer
      const deleteCustomer = async (req, res) => {
        const { id } = req.params
      
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({
            "status": 404,
            "message": "invalid customer id"
          })
        }
      
        const  deletedCustomer= await customer.findOneAndDelete({_id: id})
      
        if(!deletedCustomer) {
          return res.status(403).json({
            "status": 403,
            "message": "you don't have enough privilege"
          })
        }
      
        res.status(200).json({
          "status": 200,
          "message": "customer deleted successfully"
        })
      }

module.exports = {
  createCustomer: createCustomer,
  customerLogin: customerLogin,
  getAllCustomers: getAllCustomers,
  searchCustomer: searchCustomer,
  getCustomer:getCustomer,
  updateCustomer:updateCustomer,
  deleteCustomer:deleteCustomer
};
