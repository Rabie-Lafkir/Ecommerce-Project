const express = require('express');
const router = express.Router();
const revenueController = require('../Controllers/revenueController');

router.route('/').get(revenueController.totalRevenue);
module.exports = router;
