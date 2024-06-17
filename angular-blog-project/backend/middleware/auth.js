const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

// Authentication Middleware
exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.id).select('-password');
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something is wrong",
            error: err.message
        });
    }
};

exports.isUser = (req,res,next) =>{
    try
    {
        if (req.user && req.user.role === 'user') {
             next();
         } else {
             return res.status(403).json({
                 success: false,
                 message: 'Not authorized as User'
             });
         }
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"Failed to go user route"
        })
    }
}

exports.isAdmin = (req,res,next) =>{
    try
    {
        if (req.user && req.user.role === 'admin') {
             next();
         } else {
             return res.status(403).json({
                 success: false,
                 message: 'Not authorized as Admin'
             });
         }
    }
     catch(err)
     {
         return res.status(500).json({
             success:false,
             message:"Failed to go user route"
         })
     }
 }