require('dotenv').config();
const connectDb = require('./config/dbConnection')
const bodyParser = require('body-parser') 
const express = require('express');
const app = express();




const PORT = process.env.PORT || 4000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
//User Routes
app.use('/v1/users',require('./Routes/userRoutes'));
//Customer Routes
app.use('/v1/customers',require('./Routes/customerRoutes'));
//Categories and subcategories Routes
app.use('/v1/categories', require('./Routes/categorieRoutes'));
app.use('/v1/subcategories', require('./Routes/subcategorieRoutes'));
//Products and orders Routes
app.use('/v1/products',require('./Routes/productRoutes'))
app.use('/v1/orders',require('./Routes/orderRoutes'))


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDb();
})
