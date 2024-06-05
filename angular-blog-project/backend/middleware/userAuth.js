const jwt = require("jsonwebtoken");
const User = require("../model/userModel")
exports.userAuth = async(req,res,next) =>{
    try
    {
        // console.log(req.cookies.token);
        const token = req.cookies.token;
        if(!token)
            {
                return res.status(401).json({
                    success:false,
                    message:"Token is missing"
                })
            }
        try
        {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            // req.user= decode;
            // console.log(decode);
            req.user = await User.findById(decode.id).select('-password');
            // console.log(req.user)
            if (req.user && req.user.role === 'user') {
                // console.log("user present");
                return next();
            } else {
              return res.status(401).json({ message: 'Not authorized as User' });
            }
        }   
        catch(err)
        {
            return res.status(500).json({
                success:false,
                message:"Something is wrong"
            })
        }
    }
    catch(err)
    {
        return res.status(400).json({
            success:false,
            message:"Failed to get token"
        })
    }
}
