const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ['user', 'admin'], 
        default: 'user'
    },
    gender:{
        type:String,
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pincode:{
        type:Number    
    },
    profileImage:{
        originalName:{
            type:String
        },
        fileName:{
            type:String
        }
    }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)


