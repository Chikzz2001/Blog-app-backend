const express=require('express')
const {getAllBlogs,addBlog,updateBlog,getParticularBlog,deleteBlog,getByUserId}=require('../controllers/BLogController')

const blogRouter=express.Router()

blogRouter.get('/',getAllBlogs)
blogRouter.post('/create-blog',addBlog)
blogRouter.patch('/update-blog/:id',updateBlog)
blogRouter.get('/get-blog/:id',getParticularBlog)
blogRouter.delete('/delete-blog/:id',deleteBlog)
blogRouter.get('/get-blogs-of-particular-user/:id',getByUserId)

module.exports=blogRouter