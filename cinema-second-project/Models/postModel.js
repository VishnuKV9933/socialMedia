const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema=new Schema({

    userId:{
        type:ObjectId,
        required:[true,"user id is required"]
    },
    image:{
        type:String
    },
    description:{
        type:String
    },
    imageUrl:{
        type:String
    },
    like:{
        type:Array
    },
    comments:{
        type:Array
    }
 },
 {timestamps:true}
)

module.exports=mongoose.model("post",PostSchema)