const Blog = require('../model/blogModel')

exports.getPublishedBlogs = async(req,res) =>{
    try
    {
        const page = parseInt(req.query.page) || 1;
        const pageSize =parseInt(req.query.pageSize) || 5;
        const searchQuery = req.query.searchQuery || '';

        const query = {publish:true,title:{$regex:searchQuery,$options:'i'}}
        const blogs = await Blog.find(query).populate('author', 'firstname lastname').sort({createdAt:-1}).skip((page-1)*pageSize).limit(pageSize).exec();
        
        const countBlogs = await Blog.countDocuments(query);

        res.status(200).json({
            success:true,
            publishedBlogs:blogs,
            totalPage:Math.ceil(countBlogs/pageSize)
        })

    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to getting data ${err.message}`
        })
    }
}

