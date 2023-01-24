const router = require("express").Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User.js")

//REGISTER API
router.post("/register",async(req,res)=>{
    try{
        const {userName,email,password} = req.body;
        if (!userName) throw new Error("User Name cannot be empty");
        if (!email) throw new Error("Email cannot be empty");
        if (!password) throw new Error("Password cannot be empty");
        const checkEmail = await User.findOne({ email: email });
        if (checkEmail) throw new Error("Email Already exist");
        const salt= await bcrypt.genSalt(10) ;
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            userName:req.body.userName,
            email:req.body.email,
            password:hashedPassword
        })
        const userObj = await user.save();
        const token = jwt.sign(
            {
                userId:userObj._id,
                email:email
            },
            process.env.TOKEN_SECRET,
            {expiresIn:'1800s'}       
            
        )
        const response={
            status:1,
            message:"Registration successfull",
            user:userObj,
            token
        }
        res.status(200).json(response)
    }catch(err){
        res.json({
            status:0,
            message:err.message
        })
    }
})

//LOGIN API
router.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;
        if (!email) throw new Error("Email cannot be empty");
        if (!password) throw new Error("Password cannot be empty");
        const user = await User.findOne({ email: email });
        if (!user) throw new Error("Email does not exist");
        const passwordMatches = await bcrypt.compare(password,user.password);
        if(!passwordMatches) throw new Error("Incorrect Password");
        const token = jwt.sign(
            {
                userId:user._id,
                email
            },
            process.env.TOKEN_SECRET,
            {expiresIn:'1800s'}
        )
        const response={
            status:1,
            message:"login successfull",
            user:user,
            token
        }
        res.status(200).json(response)
    }catch(err){
        res.json({
            status:0,
            message:err.message
        })

    }
})

module.exports = router;
