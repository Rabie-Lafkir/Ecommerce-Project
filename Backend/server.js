require('dotenv').config();
const connectDb = require('./config/dbConnection')
const bodyParser = require('body-parser') 
const express = require('express');
const app = express();
//const Categories = require('./Models/Categories');
//const Subcategories= require('./Models/Subcategories');



const PORT = process.env.PORT || 4000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
//User Routes
app.use('/users',require('./Routes/usersRoute'));
//Categories and subcategories Routes
app.use('/api/categories', require('./Routes/CategoriesRoute'));
app.use('/api/subcategories', require('./Routes/SubcategoriesRoutes'));


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDb();
})
