const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const session = require("express-session");

exports.registerUser = async(req,res) =>{
    try{    
        const { firstname ,lastname, email, password } = req.body;
        if(!firstname && !lastname && !email && !password) 
            {   
                return res.status(400).json({
                    success:false,
                    message:"All fields are required"
                })
            }
        const existingUser = await User.findOne({email})
        if(existingUser)
            {
                return res.status(400).json({
                    success:false,
                    message:'Email already registered'
                })
            }
            let hashedpassword;
            try{
                hashedpassword = await bcrypt.hash(password,10)
            }   
            catch(err){
                return res.status(400).json({
                    success:false,
                    message:"Failed to generate secure password"
                })
            }
        const userData = await User.create({
            firstname,lastname,email,password:hashedpassword
        });
        res.status(201).json({
            success:true,
            user:userData,
            message:"Registered successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            error:`Error is ${err}`
        })
    }
}

exports.loginUser = async(req,res) => {
    try {
        const {email, password} = req.body;
        if(!email && !password)
            {
                return res.status(400).json({
                    success:false,
                    message:"All fields are required"
                })
            }
        const user = await User.findOne({email});
        if(!user)
            {
                return res.status(400).json({
                    success:false,
                    message:"User is not registered"
                })
            }

            const payload = {
                email:user.email,
                id:user.id,
                role:user.role
            }
        if(await bcrypt.compare(password,user.password))
            {   
                let token = jwt.sign(payload,process.env.JWT_SECRET,{
                    expiresIn:'2h'
                }) 
                user.token = token;
                user.password = undefined;
        
                const options={
                    expires:new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly:true,
                    // secure:process.env.JWT_SECRET === 'bloggingsecuresite',
                    // path:'/'
                }
                // console.log("cookie",token);
                res.cookie('token',token,options)
                res.status(200).json({
                    success:true,
                    token,
                    user,
                    message:"Loggedin successfully"
                })
           }
            else
            {
                return res.status(400).json({
                    success:false,
                    message:"Password is not matching"
                })
            }
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to login ${err.message}`
        })
    }
}


exports.updateProfileImage = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.user._id);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if a file was uploaded
        if (req.file) {
            // Update the user's profile image
            user.profileImage = {
                originalName: req.file.originalname,
                fileName: req.file.filename
            };
        }

        // Save the updated user document
        await user.save();

        // Return a success response with the updated user document
        res.status(200).json({
            success: true,
            message: 'Profile image updated successfully',
            user
        });
    } catch (error) {
        // Handle errors and return a failure response
        res.status(500).json({
            success: false,
            message: `Failed to update profile image ${err.message}`
        });
    }
};
exports.getUser = async(req,res) =>{
    try{    
    //    const userId = req.params.id;
        const userData = await User.findById(req.user._id);
        if(!userData)
            {
                return res.status(400).json({
                    success:false,
                    message:"User not found"
                })
            }
        res.status(200).json({
            success:true,
            user:userData,
            message:"getting user successfully"
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to getting user ${err.message}`
        })
    }
} 


exports.logout = async(req,res) =>{
    try
    {
        req.session.destroy(); 
        res.clearCookie('token',{httpOnly:true,})
        res.status(200).json({
            success:true,
            message:"Logout Successfully"
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to logout ${err.message}`
        })
    }
}

exports.updateDetails = async(req,res) =>{
    try
    {
        const userId = req.user._id
        const {firstname,lastname,email,gender,address,state,city,pincode} = req.body;
        const updateFields = {firstname,lastname,email,gender,address,state,city,pincode};

        Object.keys(updateFields).forEach(key =>updateFields[key]===undefined && delete updateFields[key]); 
        try{
            const updatedUser = await User.findByIdAndUpdate(userId,{$set:updateFields},{new:true,runValidators:true})
            if(!updatedUser)
                {
                    res.status(404).json({
                        success:false,
                        message:"User not found"
                    })
                }
            res.status(200).json({
                success:true,
                user:updatedUser,
                message:"User Updated Successfully"
            })
        }
        catch(err)
        {
            res.status(500).json({
                success:false,
                message:"Failed to update user"
            })
        }
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:`Failed to ${err.message}`
        })
    }
}