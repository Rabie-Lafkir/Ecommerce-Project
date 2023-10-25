const express = require('express');
const router = express.Router();
const userController = require('../Controllers/usersController')
const authToken = require('../Middlewares/authMiddleware');
const validateToken = require('../Middlewares/authMiddleware');
const usersController = require('../Controllers/usersController');

router.post('/',userController.userRegister);
router.post('/login',userController.userLogin);
router.get('/', (req, res) => {
    const { query } = req.query;

    if (query) {
      // Search for users based on the 'query' parameter
      userController.searchUser(req, res);
    } else {
      // List all users
      userController.getAllUsers(req, res);
    }
  });

router.get('/:id(\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12})',validateToken,userController.getUserById);
router.put('/:id(\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12})',usersController.updateUser);
router.delete('/:id(\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12})',usersController.deleteUser);



module.exports = router;
