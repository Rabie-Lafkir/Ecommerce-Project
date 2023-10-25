const express = require('express');
const router = express.Router();

const {
    createSubCategory, getSubcategories,
    searchSubcategory,getSubcategory,
    updateSubcategory,
    deleteSubcategory
 
}= require('../Controllers/SubcategoriesControllers');



router.route('/').post(createSubCategory)
        .get(getSubcategories)
        .get(searchSubcategory); 

        
router.route('/:id')
    .get(getSubcategory)
    .put(updateSubcategory)
    .delete(deleteSubcategory);



module.exports = router;
