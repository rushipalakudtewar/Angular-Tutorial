const Blog = require("../model/blogModel")
const fs = require("fs/promises")
const path = require('path');

exports.createBlog = async(req,res) => {
    try {
        console.log(req.file);
        const {title,content,tags} = req.body;
        const parsedTags = JSON.parse(tags)
        if(!title && !content && !tags) 
            {
                return res.status(400).json({
                    success:false,
                    message:"All field are required"
                })
            }
            const blogData = {title,content,tags: parsedTags,author:req.user._id}
            if(req.file)
            {
                blogData.blogImage = {
                    fileName:req.file.filename,
                    originalName:req.file.originalname
                }
            }
        const newBlog = await Blog.create(blogData)
        res.status(201).json({
            success:true,
            blog:newBlog,
            message:"Blog created successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:`Failed to create ${err}`
        })
    }
}

exports.getBlogs = async(req,res)=>{
    try
    {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;
        const searchQuery = req.query.searchQuery || '';

        const blogData = await Blog.find({author:req.user._id,title:{$regex:searchQuery,$options:'i'}}).sort({createdAt:-1}).skip((page-1)*pageSize).limit(pageSize).exec();
        const countblog = await Blog.countDocuments({author:req.user._id,title:{$regex:searchQuery,$options:'i'}});
        res.status(200).json({
            success:true,
            blogs:blogData,
            pages:Math.ceil(countblog/pageSize),
            message:"Blogs loaded successfully"
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to get blogs ${err.message}`
        })
    }
}

exports.getBlogbyId = async(req,res) =>{
    try{
        const blogData = await Blog.findById(req.params.id)
        if(blogData && blogData.author.toString() === req.user._id.toString())
            {
                res.status(200).json({
                    success:true,
                    blog:blogData,
                    message:"Blog loaded by id"
                })
            }
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to getting blog by Id ${err.message}`
        })
    }
}

exports.updatedBlog = async(req,res) =>{
    try
    {
        const {title,content,tags} = req.body;
        const parsedTags = JSON.parse(tags);
        const blogData = await Blog.findById(req.params.id);

        if(blogData && blogData.author.toString()===req.user._id.toString())
            {
                blogData.title = title || blogData.title;
                blogData.content = content || blogData.content;
                blogData.tags = parsedTags || blogData.tags;
                if (req.file) {
                    blogData.blogImage = {
                        originalName: req.file.originalname,
                        fileName: req.file.filename
                    };
                }
                const updatedBlog = await blogData.save();
                console.log(updatedBlog);
                res.status(200).json({
                    success:true,
                    blog:updatedBlog,
                    message:"Blog updated Successfully"
                })
            }
            else
            {
                res.status(400).json({
                    success:false,
                    message:"User is not authorised"
                })
            }
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to updated data ${err.message}`
        })
    }
}


exports.deleteBlog = async(req,res) =>{
    try
    {
        const blogData = await Blog.findById(req.params.id);
        console.log(blogData);
        if(blogData.blogImage.fileName)
            {
                console.warn(path.join(__dirname,'/uploads/blogimages',blogData.blogImage.fileName));
                await fs.unlink(path.join(__dirname,'..', 'uploads/blogimages',blogData.blogImage.fileName))
            }
        if(blogData && blogData.author.toString()===req.user._id.toString())
            {
                await Blog.findByIdAndDelete(blogData._id);
                
                res.status(200).json({
                    success:true,
                    message:"Blog deleted successfully"
                })
            }
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to delete blog ${err.message}` 
        })
    }
}

