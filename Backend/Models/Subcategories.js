const mongoose = require('mongoose');

const  subcategories= new mongoose.Schema({
    
    id:{
        type :String ,
        required :true,
        unique: true,
        description: 'Subcategory ID'
    },

    subcategory_name:{
        type : String ,
        required: true,
        description: ' Subcategory name',
    },
    category_id:{
        type: String,
        description: ' The related category id',
        ref:'categories',
       // type: mongoose.Schema.Types.ObjectId,
    },
    active:{
        type: Boolean,
        description: 'Subcategory active status'
    }
}, 
    
{timestamps: true} 
);


module.exports = mongoose.model("Subcategories", subcategories);