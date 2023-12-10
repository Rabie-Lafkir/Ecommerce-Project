const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController')

const authMiddleware = require('../Middlewares/authMiddleware');
const usersController = require('../Controllers/userController');

router.post('/',userController.userRegister);
router.post('/login',userController.userLogin);
router.get('/',(req, res) => {
    const { query } = req.query;

    if (query) {
      // Search for users based on the 'query' parameter
      userController.searchUser(req, res);
    } else {
      // List all users
      userController.getAllUsers(req, res);
    }
  });

router.get('/:id',authMiddleware.checkAdminRole,userController.getUserById);
router.put('/:id',authMiddleware.checkAdminRole,usersController.updateUser);
router.delete('/:id',authMiddleware.checkAdminRole,usersController.deleteUser);



module.exports = router;
