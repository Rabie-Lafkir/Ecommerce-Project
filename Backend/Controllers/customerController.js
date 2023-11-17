const customer = require("../Models/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose=require("mongoose")
require("dotenv").config();


// Generate Token and Refresh Token
const generateToken = (customer) => {
  console.log(customer) 
  return jwt.sign(
    { customer },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

const generateRefreshToken = (customer, expiresIn) => {
  return jwt.sign({ customer }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn,
  });
};

//post creat costumer
const createCustomer = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }
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



const customerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate request parameters
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required fields." });
    }

    const existingCustomer = await customer.findOne({ email: email });

    if (!existingCustomer) {
      return res.status(401).json({
        status: 401,
        message: "customer does not exist"
      });
    }

    // Compare hashed passwords using bcrypt.compare
    const passwordMatch = await bcrypt.compare(password, existingCustomer.password);
    if (!passwordMatch) {
      return res.status(401).json({
        status: 401,
        message: "Invalid credentials"
      });
    }

    // Update the last_login field with the current date and time
    existingCustomer.last_login = new Date();
    await existingCustomer.save();

    // Generate JWT tokens
    const accessToken = generateToken(existingCustomer);
    const refreshToken = generateRefreshToken(existingCustomer, '7d'); // Set refresh token expiration to 7 days

    res.status(200).json({
      message: "Logged in successfully",
      accessToken: accessToken,
      tokenType: "Bearer",
      expiresIn: "1h",
      refreshToken: refreshToken
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Login failed. Please try again later." });
  }
};

module.exports = customerLogin;



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
