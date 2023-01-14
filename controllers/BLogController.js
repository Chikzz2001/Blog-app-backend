const { default: mongoose } = require('mongoose')
const Blog=require('../model/blog')
const User = require('../model/User')

const getAllBlogs=async(req,res,next)=>{
    let blogs
    try{
        blogs=await Blog.find()
    }catch(err){
        return console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message:"No Blog found!!"})
    }
    return res.status(200).json({blogs})
}

const addBlog=async(req,res,next)=>{
    const {title,description,image,user}=req.body
    let existingUser
    try{
        existingUser=await User.findById(user)
    }catch(err){
        return console.log(err)
    }
    if(!existingUser)
    return res.status(404).json({message:"User does not exist"})
    const blog=new Blog({
        title,
        description,
        image,
        user
    })
    try{
        //important-unless every task is done(for all await task) the data will be partially saved one by one
        //for the current session.When every function is performed we finally commit the changes in the database
        const session=await mongoose.startSession()
        session.startTransaction()
        await blog.save({session})
        existingUser.blogs.push(blog)
        await existingUser.save({session})
        await session.commitTransaction()
    }catch(err){
        return console.log(err)
    }
    return res.status(200).json({blog})
}

const updateBlog=async(req,res,next)=>{
    const id=req.params.id
    const {title,description,image}=req.body
    let selectBlog
    try{
        selectBlog=await Blog.findByIdAndUpdate(id,{title,description,image})
    }catch(err){
        return console.log(err)
    }
    if(!selectBlog)
    return res.status(500).json({message:"The id is not valid"})
    return res.status(200).json({selectBlog})
}

const getParticularBlog=async(req,res,next)=>{
    const id=req.params.id
    let findBlog
    try{
        findBlog=await Blog.findOne({_id:id})//or we can use Blog.findById(id)
    }catch(err){
        return console.log(err)
    }
    if(!findBlog)
    return res.status(404).json({message:"Sorry!! this blog does not exist!!"})
    return res.status(200).json({findBlog})
}

const deleteBlog=async(req,res,next)=>{
    const id=req.params.id
    let deletedBlog
    try{
        deletedBlog=await Blog.findByIdAndRemove(id).populate('user')
        await deletedBlog.user.blogs.pull(deletedBlog)
        await deletedBlog.user.save()
    }catch(err){
        return console.log(err)
    }
    if(!deletedBlog)
    return res.status(500).json({message:"Oops!! unable to delete the blog"})
    return res.status(200).json({message:"blog deleted successfully"})
}

const getByUserId=async(req,res,next)=>{
    const userId=req.params.id
    let userBlogs
    try{
        userBlogs=await User.findById(userId).populate('blogs')
    }
    catch(err){
        return console.log(err)
    }
    if(!userBlogs){
        return res.status(404).json({message:"No blogs found"})
    }
    return res.status(200).json({blog:userBlogs})
}

module.exports={getAllBlogs,addBlog,updateBlog,getParticularBlog,deleteBlog,getByUserId}