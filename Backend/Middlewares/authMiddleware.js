// Middleware for authenticating the user
function authenticateUser(req, res, next) {
  const token = req.headers.authorization;
  // Your authentication logic here
  next();
}

module.exports = {
  authenticateUser,
};

// Middleware for authenticating the customer
function authenticateCustomer(req, res, next) {
  const token = req.headers.authorization;
  // Your authentication logic here
  next();
}

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
  authenticateCustomer,
  checkOrderPrivilege,
  checkListOrdersPrivilege,
  checkGetOrderByIdPrivilege,
};
