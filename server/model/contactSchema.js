const mongoose = require('mongoose');
const contactSchema=new mongoose.Schema({
    Firstname:{
        type:String,
    },
    Lastname:{
        type:String,
    },
    Email:{
        type:String,
    },
    ZipCode:{
        type:Number,
    },
    Age:{
        type:String,
    },
    PhoneNumber:{
        type:Number
    },
    StorageMedium:{
        type:String
    }
})
const contactModel=new mongoose.model("contactSchema",contactSchema);
module.exports= contactModel;
