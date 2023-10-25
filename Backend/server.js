require('dotenv').config();
const connectDb = require('./config/dbConnection')
const bodyParser = require('body-parser') 
const express = require('express');
const app = express();


const PORT = process.env.PORT || 4000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/users',require('./Routes/usersRoute'));


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDb();
})