const User = require("../model/userModel");
const Blog = require("../model/blogModel")
// exports.registerAdmin = async(req,res) =>{
//     try{    
//         const { username, email, password } = req.body;
//         if(!username && !email && !password) 
//             {   
//                 res.json({
//                     success:false,
//                     message:"All fields are required"
//                 })
//             }
//         const existingUser = await Admin.findOne({email})
//         if(existingUser)
//             {
//                 res.status(400).json({
//                     success:false,
//                     message:'Email already registered'
//                 })
//             }
//             let hashedpassword;
//             try{
//                 hashedpassword = await bcrypt.hash(password,10)
//             }   
//             catch(err){
//                 res.status(400).json({
//                     success:false,
//                     message:"Failed to generate secure password"
//                 })
//             }
//         const adminData = await Admin.create({
//             username,email,password:hashedpassword
//         });
//         res.status(201).json({
//             success:true,
//             admin:adminData,
//             message:"Registered successfully"
//         })
//     }
//     catch(err){
//         res.status(400).json({
//             success:false,
//             error:`Error is ${err}`
//         })
//     }
// }

// exports.loginAdmin = async(req,res) => {
//     try {
//         const {email, password} = req.body;
//         if(!email && !password)
//             {
//                 res.status(400).json({
//                     success:false,
//                     message:"All fields are required"
//                 })
//             }
//         const admin = await Admin.findOne({email});
//         if(!admin)
//             {
//                 res.status(400).json({
//                     success:false,
//                     message:"Admin is not registered"
//                 })
//             }

//             const payload = {
//                 email:admin.email,
//                 id:admin.id,
//                 role:admin.role
//             }
//         if(await bcrypt.compare(password,admin.password))
//             {   
//                 let token = jwt.sign(payload,process.env.JWT_SECRET,{
//                     expiresIn:'2h'
//                 })  
//                 admin.token = token;
//                 admin.password = undefined;
        
//                 const options={
//                     expires:new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//                     httpOnly:true
//                 }
//                 res.cookie('token',token,options).status(200).json({
//                     success:true,
//                     token,
//                     admin,
//                     message:"Admin logged in successfully"
//                 })
//            }
//             else
//             {
//                 res.status(400).json({
//                     success:false,
//                     message:"Password is not matching"
//                 })
//             }
//     }
//     catch(err)
//     {
//         res.status(404).json({
//             success:false,
//             message:`Failed to login ${err}`
//         })
//     }
// }
exports.getAdmin = async(req,res) =>{
    try{    
    //    const userId = req.params.id;
        const userData = await User.findById(req.user._id);
        if(!userData)
            {
                return res.status(400).json({
                    success:false,
                    message:"Admin not found"
                })
            }
        res.status(200).json({
            success:true,
            user:userData,
            message:"getting admin successfully"
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to getting admin ${err}`
        })
    }
} 


exports.getAllUsers = async(req,res) =>{
    try{    
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 5;
        const searchQuery = req.query.searchQuery || '';
        const query = {role:"user",$or:[
            {firstname:{$regex:searchQuery,$options:'i'}},
            {lastname:{$regex:searchQuery,$options:'i'}}
        ]}
        const userData = await User.find(query).sort({createdAt:-1}).skip((page-1)*pageSize).limit(pageSize).exec();
        const countUser = await User.countDocuments(query);

        res.status(200).json({
            success:true,
            data:userData,
            pages:Math.ceil(countUser/pageSize),
            message:"All users getting successfully"
        })

    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Failed to getting all users"
        })
    }
}

exports.deleteUser= async(req,res) =>{
    try
    {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:"User deleted succesfully"
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to delete User ${err}`
        })
    }
}

exports.getAllBlogs = async(req,res) =>{
    try{
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 5;
        const searchQuery = req.query.searchQuery || '';
        const blogData = await Blog.find({title:{$regex:searchQuery,$options:'i'}}).populate('author', 'firstname lastname').sort({createdAt:-1}).skip((page-1)*pageSize).limit(pageSize).exec();
        const totalBlogs = await Blog.countDocuments({title:{$regex:searchQuery,$options:'i'}})
        res.status(200).json({
            success:true,
            blogs:blogData,
            pages:Math.ceil(totalBlogs/pageSize),
            message:"getting blogs successfully"
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to getting all blogs ${err.message}`
        })
    }
}

exports.deleteBlogAdmin = async(req,res) =>{
    try{
        await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            message:"Blog deleted succesfully"
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to delete blog ${err.message}`
        })
    }
}

exports.setPublish =  async(req,res) =>{
    try
    {
        const blogId = req.params.id;
        const {publish} = req.body;
        if (typeof publish !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: "Publish status must be a boolean value"
            });
        }
        const publishBlog = await Blog.findByIdAndUpdate(blogId,{$set:{publish  }},{new:true,runValidators:true})
            if(!publishBlog)
                {
                    res.status(404).json({
                        success:false,
                        message:"Blog not found"
                    })
                }
            res.status(200).json({
                success:true,
                blog:publishBlog,
                message:"Publish status changed successfully"
            })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to publish ${err.message}`
        })
    }
}

exports.getCount = async(req,res) =>{
    try
    {
        const blogCount = (await Blog.find()).length;
        const userCount = (await User.find({role:'user'})).length;

        res.status(200).json({
            success:true,
            blogsCount:blogCount,
            usersCount:userCount,
            message:"Counted successfully"
        })

    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to getting count ${err.message}`
        })
    }
}

// exports.logoutAdmin = async(req,res) =>{
//     try
//     {
//         req.session.destroy(); 
//         res.clearCookie('token')
//         res.status(200).json({
//             success:true,
//             message:"Admin Logout Successfully"
//         })
//     }
//     catch(err)
//     {
//         res.status(500).json({
//             success:false,
//             message:"Failed to logout admin"
//         })
//     }
// }