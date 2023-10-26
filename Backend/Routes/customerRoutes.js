const express=require('express')
const router =express.Router()
const customerController=require('../Controllers/customerController')

//Router creat costumer
router.post('/customers',customerController.createCustomer)
//Authentication 
router.post('/customers/login',customerController.customerLogin)
//getAllcustomer
//router.get('/customers',customerController.getAllCustomers)
//search for customer
//router.get('/customers/search',customerController.searchCustomer) 
router.get('/customers', (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        customerController.searchCustomer(req, res, next);  
    }
    else{
        customerController.getAllCustomers(req, res, next); 
    } 
});
//get customerbyid
router.get('/customers/:id',customerController.getCustomer)
//update Customer updateCustomer
router.put('/customers/:id',customerController.updateCustomer),
//delete customer 
router.delete('/customers/:id',customerController.deleteCustomer),

module.exports=router;