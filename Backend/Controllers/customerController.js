const customer = require("../Models/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose=require("mongoose")
const { sendActivationEmail } = require("../Middlewares/emailSender");
 
require("dotenv").config();





// Generate Token and Refresh Token
const generateToken = (customer) => {
  const { _id, first_name, last_name, email } = customer;
  const payload = {
    _id,
    first_name,
    last_name,
    email,
  };

  return jwt.sign(
    { payload },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1h',
    }
  );
};

const generateRefreshToken = (customer, expiresIn) => {
  const { _id, first_name, last_name, email } = customer;
  const payload = {
    _id,
    first_name,
    last_name,
    email,
  };

  return jwt.sign({ payload }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn,
  });
};

const generateActivationToken = () => {
  return Math.random().toString(36).substring(7);
};
//post creat costumer
const createCustomer = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }

  try {
    // Check if a customer with the provided email already exists
    const existingCustomer = await customer.findOne({ email });
    if (existingCustomer) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const activationToken = generateActivationToken();

    const newCustomer = new customer({
      first_name,
      last_name,
      email,
      password: hashPassword,
      activationToken
    });

    await newCustomer.save();
    await sendActivationEmail(email, activationToken);

    res.status(201).json({ message: "Check your email for activation instructions" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const activateAccount = async (req, res) => {
  const activationToken = req.params.activationToken;

  try {
    const activateCustomer = await customer.findOne({ activationToken });

    if (!customer) {
      return res.status(404).json({ error: 'Invalid activation token' });
    }

    // Update customer's active status to true
    activateCustomer.active = true;
    activateCustomer.activationToken = undefined; // Clear the activation token
    await activateCustomer.save();

    res.status(200).json({ message: 'Account activated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const customerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required fields." });
    }

    const existingCustomer = await customer.findOne({ email });

    if (!existingCustomer) {
      return res.status(404).json({
        error: "Customer does not exist"
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingCustomer.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid credentials"
      });
    }

    existingCustomer.last_login = new Date();
    await existingCustomer.save();

    const accessToken = generateToken(existingCustomer);
    const refreshToken = generateRefreshToken(existingCustomer, '7d');

    return res.status(200).json({
      message: "Logged in successfully",
      accessToken,
      tokenType: "Bearer",
      expiresIn: "1h",
      customer:existingCustomer,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Login failed. Please try again later." });
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

//total customers
const getTotalCustomers = async (req, res) => {
  try {
    const totalCustomers = await customer.countDocuments({});
    res.status(200).json( totalCustomers );
  } catch (error) {
    console.error('Error getting total customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createCustomer: createCustomer,
  customerLogin: customerLogin,
  activateAccount:activateAccount,
  getAllCustomers: getAllCustomers,
  searchCustomer: searchCustomer,
  getCustomer:getCustomer,
  updateCustomer:updateCustomer,
  deleteCustomer:deleteCustomer,
  getTotalCustomers:getTotalCustomers
};
