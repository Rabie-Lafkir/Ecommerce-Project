const mongoose = require('mongoose');

const uri ="mongodb+srv://abr:tzKfmOI7vIWuy0OI@cluster0.psurhzr.mongodb.net/store"; //after /, i add the name of the project
const connectDb =  async () => {
    try{
        const connect = await mongoose.connect(uri);
        console.log("database connected",
                        connect.connection.host,
                        connect.connection.name
                    );
    }catch (err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;