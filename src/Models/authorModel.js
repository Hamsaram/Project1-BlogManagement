const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    fname:{
        type: String,
        required: true,
        // trim :true
    },
    lname:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required :true
    }
},{timestamps:true})

module.exports = mongoose.model("Author",authorSchema)
    
   