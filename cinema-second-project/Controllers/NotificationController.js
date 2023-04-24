const { default: mongoose } = require("mongoose");
const UserModel = require("../Models/UserModel");
const postModel = require("../Models/postModel");
const notificationModel = require("../Models/notificationModel");



const addPostNotification =async(req,res)=>{
   
    try {
        
        const user=await UserModel.findById(req.body.userId)
    
        for(const follower of user.followers){
            const data={
                postId:mongoose.Types.ObjectId(req.body._id),
                senderName:user.username,
                userId:mongoose.Types.ObjectId(follower),
                message:"added a post",
            }
            const notification =  new notificationModel(data)
          const response=  await notification.save()
          
        }
        
       res.status(200).json({success:true})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

   
} 


const getNotification=async(req,res)=>{
    const notifications=(await notificationModel.find({userId:mongoose.Types.ObjectId(req.params.id)}).limit(8)).reverse()
    

    res.status(200).json(notifications)

}


const likePost=async(req,res)=>{

    try {
        
        const user=await UserModel.findById(req.body.likerId)

    
      const likeNotification=await notificationModel.findOne({$and:[
        { postId:mongoose.Types.ObjectId(req.body._id)},{senderId:mongoose.Types.ObjectId(req.body.likerId)},
    { message:"liked your post"}]})

    if(!likeNotification?._id&&req.body.likerId!==req.body.userId){
        const data={
            postId:mongoose.Types.ObjectId(req.body._id),
            senderName:user.username,
            senderId:mongoose.Types.ObjectId(req.body.likerId),
            userId:mongoose.Types.ObjectId(req.body.userId),
            message:"liked your post"
        }
        const notification =  new notificationModel(data)
      const response=  await notification.save()

      
    
    }

       
          
        
        
       res.status(200).json({success:true})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}


const commentPost = async(req,res)=>{

    try {
    const user=await UserModel.findById(req.body.commenderId)

    const data={
        postId:mongoose.Types.ObjectId(req.body._id),
        senderName:user.username,
        senderId:mongoose.Types.ObjectId(req.body.commenderId),
        userId:mongoose.Types.ObjectId(req.body.userId),
        message:`add a comment "${req.body.comment}" on your post`
    }

    const notification =  new notificationModel(data)
    const response=  await notification.save()
    res.status(200).json({success:true})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

    
}

const replyComment=async(req,res)=>{

    try {
        const user=await UserModel.findById(req.body.commenderId)
        const postData={
            postId:mongoose.Types.ObjectId(req.body._id),
            senderName:user.username,
            senderId:mongoose.Types.ObjectId(req.body.commenderId),
            userId:mongoose.Types.ObjectId(req.body.userId),
            message:`add a comment "${req.body.reply}" on your post`
        }
    
        const data={
            postId:mongoose.Types.ObjectId(req.body._id),
            senderName:user.username,
            senderId:mongoose.Types.ObjectId(req.body.commenderId),
            userId:mongoose.Types.ObjectId(req.body.commentOwner),
            message:`add a reply "${req.body.reply}" to your comment`
        }
        const notification =  new notificationModel(postData)
        const response=  await notification.save()
        const notification2 =  new notificationModel(data)
        const response2=  await notification2.save()
        res.json({success:true})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

  
}

const follow=async(req,res)=>{

    try {
        const user=await UserModel.findById(req.body.userId)

        console.log("req.body");
        console.log(req.body);

    const data={
        postId:null,
        senderName:user.username,
        senderId:mongoose.Types.ObjectId(req.body.userId),
        userId:mongoose.Types.ObjectId(req.body.followingId),
        message:`started following you`
    }

    const notification =  new notificationModel(data)
    const response=  await notification.save()

    console.log(response);

    res.status(200).json({success:true})

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

    
}


const read=async(req,res)=>{


    console.log(req.params.id);

    try {
     
        const res=await notificationModel.updateOne({_id:mongoose.Types.ObjectId(req.params.id)},
        {readed:true})

        console.log(res);

    res.json({success:true})

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

    
}





module.exports={
    addPostNotification,
    getNotification,
    likePost,
    commentPost,
    replyComment,
    follow,
    read
}