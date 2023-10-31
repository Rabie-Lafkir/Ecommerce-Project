const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Unauthorized' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Checking the admin role
const checkAdminRole = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({
          "status": 403,
          "message": "you don't have enough privilege"
        });
      } 

      if(decoded && decoded.user.role){
        next();
      }
    });
  } else {
    res.status(403).json({
      "status": 403,
      "message": "you don't have enough privilege"
    });
  }
});


const checkCustomerRole = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({
          "status": 403,
          "message": "you don't have enough privilege"
        });
      } 

      if(decoded && decoded.customer.role){
        next();
      }
    });
  } else {
    res.status(403).json({
      "status": 403,
      "message": "you don't have enough privilege"
    });
  }
});





module.exports = {
  validateToken,
  checkAdminRole,
  checkCustomerRole
};


