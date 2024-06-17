const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    publish:{
        type:Boolean,
        default:true
    },
    blogImage:{
        originalName:{
            type:String,
            required:true
        },
        fileName:{
            type:String,
            required:true
        }
    }
  
},{timestamps:true})


module.exports = mongoose.model('Blogs',blogSchema);