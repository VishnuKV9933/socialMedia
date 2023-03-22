const express=require("express")
const app=express()
const mongoose = require("mongoose")
const helmet =require("helmet")
const morgon = require("morgan")
const dotenv =require("dotenv")
const userRouter=require("./Routes/users")
const authRouter=require("./Routes/auth")
const cors = require('cors')
const cookieParser =require("cookie-parser")
mongoose.set('strictQuery', true);


dotenv.config();
app.use(cookieParser())
app.use(express.json()) 
app.use(helmet())
app.use(morgon("common"))

app.use(cors({
  origin: ['http://localhost:3000'],
  method: ['GET','POST'],
  credentials: true,
}));

app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)






mongoose.connect(process.env.MONGO_URL,
  {   useNewUrlParser: true},
  
    ()=>{
    console.log("connected to mongodb")
}
)



app.listen(8800,()=>{
console.log("backend server is running");
}) 


