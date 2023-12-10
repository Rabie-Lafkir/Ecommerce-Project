const express=require('express')
const router =express.Router()
const customerController=require('../Controllers/customerController')


router.get("/totalcustomers", customerController.getTotalCustomers);
//Router creat costumer
router.post('/',customerController.createCustomer)
//Authentication 
router.post('/login',customerController.customerLogin)
router.get('/', (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        customerController.searchCustomer(req, res, next);  
    }
    else{
        customerController.getAllCustomers(req, res, next); 
    } 
});
router.get('/activate/:activationToken', customerController.activateAccount);
//get customerbyid
router.get('/:id',customerController.getCustomer)
//update Customer updateCustomer
router.put('/:id',customerController.updateCustomer),
//delete customer 
router.delete('/:id',customerController.deleteCustomer),

module.exports=router;