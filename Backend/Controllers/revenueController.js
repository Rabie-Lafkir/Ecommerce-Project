const order =require('../Models/order');

exports.totalRevenue = async (req, res) => {
    try {
      // Calculate the total revenue by summing up cart_total_price from all orders
      const totalRevenue = await order.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$cartTotalPrice" }
          }
        }
      ]);
  
      // Extract the totalRevenue value from the aggregation result
      const totalRevenueValue = totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;
  
      res.status(200).send({
        data: { totalRevenue: totalRevenueValue }
      });
     // console.log('Total Revenue Calculation Result:', totalRevenue);

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
  const Order = require('../Models/order');

