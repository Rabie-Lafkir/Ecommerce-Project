const mongoose = require('mongoose');
require('dotenv').config()
const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.URI)
        console.log('Connected to Database')
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDb