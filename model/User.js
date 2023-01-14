const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    blogs:[
            {
                type:mongoose.Types.ObjectId,
                ref:"Blog",
                required:true
            }
          ]
})

const User=new mongoose.model("User",UserSchema);
module.exports=User;