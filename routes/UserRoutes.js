const express=require('express')
const {getAllUser,signUp,login}=require('../controllers/UserController')
const router=express.Router()

router.get("/",getAllUser)
router.post("/signup",signUp)
router.post("/login",login)

module.exports=router