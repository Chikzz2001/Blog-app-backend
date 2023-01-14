const express=require('express')
const mongoose=require('mongoose')
const router=require('./routes/UserRoutes')
const blogRouter=require('./routes/BlogRoutes')
require('dotenv').config()

const app=express()
const PORT=5000
mongoose.set("strictQuery", false);

//middleware which tells the app that the data sent during a post request is in json format and hence it de-structures it
//after parsing the JSON text
app.use(express.json())

app.use("/api/user",router)
app.use("/api/blog",blogRouter)

mongoose.connect(
    `mongodb+srv://${process.env.ADMIN}:${process.env.PASSWORD}@cluster0.snj4eq7.mongodb.net/?retryWrites=true&w=majority`
)
.then(()=>app.listen(PORT))
.then(()=>console.log(`app running at port ${PORT}`))
.catch((err)=>console.log(err))

