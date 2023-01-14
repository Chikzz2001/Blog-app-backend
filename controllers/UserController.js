const User=require('../model/User')
const bcrypt=require('bcryptjs')

const getAllUser=async(req,res,next)=>{
    let users;
    try{
        users=await User.find()
    }catch(err){
        console.log(err)
    }
    if(!users){
        return res.status(404).json({message:"No Users Found"})
    }
    return res.status(200).json({users})
}

const signUp=async(req,res,next)=>{
    const {name,email,password}=req.body
    let existingUser
    try{
        existingUser=await User.findOne({email})
    }catch(err){
        console.log(err)
    }
    if(existingUser){
        return res.status(400).json({message:"User Already Exists!! Login Instead"})
    }

    const hashedpassword=bcrypt.hashSync(password)
    const user=new User({
        name,
        email,
        password:hashedpassword,
        blogs:[]
    })

    try{
        user.save()
    }catch(err){
        console.log(err)
    }
    return res.status(201).json({user})

}

const login=async(req,res,next)=>{
    const {email,password}=req.body

    let existingUser
    try{
        existingUser=await User.findOne({email})
    }catch(err){
        console.log(err)
    }
    if(!existingUser){
        return res.status(404).json({message:"User is not registered"})
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password)
    if(isPasswordCorrect){
        return res.status(200).json({message:`Hey!! ${existingUser.name}, welcome!!`})
    }
    return res.status(400).json({message:"password is incorrect"})
}

module.exports={getAllUser,signUp,login}