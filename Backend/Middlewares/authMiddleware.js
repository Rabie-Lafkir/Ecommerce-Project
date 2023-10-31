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

// Middleware to check if the user has the necessary privilege to create an order
const checkOrderPrivilege = (req, res, next) => {
  const user = req.user; // Assuming you attach user information during authentication

  // Check the user's role here (Modify as needed)
  if (user && (user.role === 'customer' || user.role === 'admin')) {
      next(); // User has the required privilege, proceed to the route handler
  } else {
      res.status(403).json({ status: 403, message: "You don't have enough privilege" });
  }
};

// Middleware to check if the user has the necessary privilege to list orders
const checkListOrdersPrivilege = (req, res, next) => {
  const user = req.user; // Assuming you attach user information during authentication

  // Check the user's role here (Modify as needed)
  if (user && (user.role === 'admin' || user.role === 'manager')) {
      next(); // User has the required privilege, proceed to the route handler
  } else {
      res.status(403).json({ status: 403, message: "You don't have enough privilege" });
  }
};

// Middleware to check if the user has the necessary privilege to get an order by ID
const checkGetOrderByIdPrivilege = (req, res, next) => {
  const user = req.user; // Assuming you attach user information during authentication

  // Check the user's role here (Modify as needed)
  if (user && (user.role === 'admin' || user.role === 'manager')) {
      next(); // User has the required privilege, proceed to the route handler
  } else {
      res.status(403).json({ status: 403, message: "You don't have enough privilege" });
  }
};

module.exports = {
  validateToken,
  checkAdminRole,
  checkOrderPrivilege,
  checkListOrdersPrivilege,
  checkGetOrderByIdPrivilege,
};


