const Blog = require("../model/blogModel")
 
exports.createBlog = async(req,res) => {
    try {
        const {title,content} = req.body;
        if(!title && !content) 
            {
                res.status(400).json({
                    success:false,
                    message:"All field are required"
                })
            }
        const blogData = await Blog.create({
            title,content,author:req.user._id
        })
        res.status(201).json({
            success:true,
            blog:blogData,
            message:"Blog created successfully"
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:`Failed to create ${err}`
        })
    }
}

exports.getBlogs = async(req,res)=>{
    try
    {
        const blogData = await Blog.find({author:req.user._id});
        res.status(200).json({
            success:true,
            blogs:blogData,
            message:"Blogs loaded successfully"
        })
    }
    catch(err)
    {
        res.status(404).json({
            success:false,
            message:`Failed to get blogs ${err}`
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
        res.status(404).json({
            success:false,
            message:"Failed to getting blog by Id"
        })
    }
}

exports.updatedBlog = async(req,res) =>{
    try
    {
        const {title,content} = req.body;
        const blogData = await Blog.findById(req.params.id);
        if(blogData && blogData.author.toString()===req.user._id.toString())
            {
                blogData.title = title || blogData.title,
                blogData.content = content || blogData.content,
                blogData.updatedAt = Date.now();
                const updatedBlog = await blogData.save();
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
        res.status(404).json({
            success:false,
            message:"Failed to updated data"
        })
    }
}


exports.deleteBlog = async(req,res) =>{
    try
    {
        const blogData = await Blog.findById(req.params.id);
        console.log(blogData);
        if(blogData && blogData.author.toString()===req.user._id.toString())
            {
                await blogData.remove();
                console.log(blogData)
                res.status(200).json({
                    success:true,
                    message:"Blog deleted successfully"
                })
            }
    }
    catch(err)
    {
        res.status(404).json({
            success:false,
            message:"Failed to delete blog"
        })
    }

}