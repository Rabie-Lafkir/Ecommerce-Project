const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./Config/dbConnection');
const app = express();


connectDb()

const PORT = process.env.PORT || 5000;

const Categories = require('./Models/Categories');
const Subcategories= require('./Models/Subcategories');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/categories', require('./Routes/CategoriesRoute'));
app.use('/api/subcategories', require('./Routes/SubcategoriesRoutes'));



app.listen(PORT,()=>{
    console.log(`running on the port ${PORT}`);
})