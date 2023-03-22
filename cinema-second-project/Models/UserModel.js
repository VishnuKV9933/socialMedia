const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true,"Name is required"],
        minLength:3, 
        maxLength:20,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        minLength:3, 
        maxLength:50,
    },
    mobile:{
        type:Number,
        required:[true,"Mobile is required"], 
        unique:true,
        minLength:10,
       }, 
       password:{
        type:String,
        required:[true,"password is required"],
    },
    profilePicture:{
        type:String,
        required:true,
       default:" "
    },
    coverPicture:{
        type:String,
       default:" "
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isadmin:{
        type:Boolean,
        default:false
    },
    discription:{
        type:String,
        maxLength:50
    },
    city:{
        type:String,
        maxLength:50
    },
    from:{
        type:String,
        maxLength:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }
},
{timestamps:true}
)

module.exports=mongoose.model("Users",userSchema)