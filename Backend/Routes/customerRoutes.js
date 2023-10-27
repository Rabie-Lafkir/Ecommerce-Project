const express=require('express')
const router =express.Router()
const customerController=require('../Controllers/customerController')

//Router creat costumer
router.post('/',customerController.createCustomer)
//Authentication 
router.post('/login',customerController.customerLogin)
//getAllcustomer
//router.get('/customers',customerController.getAllCustomers)
//search for customer
//router.get('/customers/search',customerController.searchCustomer) 
router.get('/', (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        customerController.searchCustomer(req, res, next);  
    }
    else{
        customerController.getAllCustomers(req, res, next); 
    } 
});
//get customerbyid
router.get('/:id',customerController.getCustomer)
//update Customer updateCustomer
router.put('/:id',customerController.updateCustomer),
//delete customer 
router.delete('/:id',customerController.deleteCustomer),

module.exports=router;