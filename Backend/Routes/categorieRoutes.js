const express = require('express');
const router = express.Router();
// const authMiddleware = require('../Middlewares/authMiddleware')

const {
    createCategory,
    getCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    searchForCategories,
    getTotalCategories
} = require('../Controllers/categorieController');

router.route('/totalcategories').get(getTotalCategories);

router.route('/')
    .post(createCategory)
    .get((req, res, next) => {
        if (Object.keys(req.query).length > 0) {
            return searchForCategories(req, res, next);
        }
        getAllCategories(req, res, next);
    });

router.route('/:id')
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;