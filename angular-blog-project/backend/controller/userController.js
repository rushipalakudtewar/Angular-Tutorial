const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.registerUser = async(req,res) =>{
    try{    
        const { username, email, password } = req.body;
        if(!username && !email && !password) 
            {   
                res.json({
                    success:false,
                    message:"All fields are required"
                })
            }
        const existingUser = await User.findOne({email})
        if(existingUser)
            {
                res.status(400).json({
                    success:false,
                    message:'Email already registered'
                })
            }
            let hashedpassword;
            try{
                hashedpassword = await bcrypt.hash(password,10)
            }   
            catch(err){
                res.status(400).json({
                    success:false,
                    message:"Failed to generate secure password"
                })
            }
        const userData = await User.create({
            username,email,password:hashedpassword
        });
        res.status(201).json({
            success:true,
            user:userData,
            message:"Registered successfully"
        })
    }
    catch(err){
        res.status(400).json({
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
                res.status(400).json({
                    success:false,
                    message:"All fields are required"
                })
            }
        const user = await User.findOne({email});
        if(!user)
            {
                res.status(400).json({
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
                    httpOnly:true
                }
                res.cookie('token',token,options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:"User logged in successfully"
                })
           }
            else
            {
                res.status(400).json({
                    success:false,
                    message:"Password is not matching"
                })
            }
    }
    catch(err)
    {
        res.status(404).json({
            success:false,
            message:`Failed to login ${err}`
        })
    }
}

exports.getUser = async(req,res) =>{
    try{    
    //    const userId = req.params.id;
        const userData = await User.findById(req.user._id);
        if(!userData)
            {
                res.status(400).json({
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
        res.status(400).json({
            success:false,
            message:`Failed to getting user ${err}`
        })
    }
} 
