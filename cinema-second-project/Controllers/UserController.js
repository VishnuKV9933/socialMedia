const dotenv = require("dotenv");
dotenv.config();
const crypto = require("crypto");
const sharp = require("sharp");
const jwt_decode = require("jwt-decode");
const UserModel = require("../Models/UserModel");
const PostModel = require("../Models/postModel");
const CommentModel = require("../Models/commentModel");
const replyCommentModel = require("../Models/ReplyCommentModel");
const mongoose = require("mongoose");
const { CreateImgUrl } = require("../otherFiles/s3");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const commentModel = require("../Models/commentModel"); 
const postModel = require("../Models/postModel");
const { v4: uuidv4 } = require('uuid');


// const randomImagename = crypto.randomBytes(32).toString("hex");

const bucketName = process.env.AWS_Bucket_Name;
const region = process.env.AWS_Bucket_Region;
const accessKeyId = process.env.AWS_Access_key;
const secretAccessKey = process.env.AWS_Secret_access_key;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  region: region,
});

// upload post ----------------------

const userPostS3Upload = async (req, res) => {
  const randomImagename =uuidv4();
  try {
    if (!req.file) {
      const token = req.headers.jwt;
      const decoded = jwt_decode(token);

      // const id = mongoose.Types.ObjectId(decoded.id);
      // const user=await UserModel.findOne({_id:id})

      const newPost = await PostModel({
        userId: decoded.id,
        description: req.body.description,
      });

      newPost.save().then((data) => {
        res.send(data);
      });
    } else {
      const buffer = await sharp(req.file.buffer)
        .rotate()
        .resize({
          height: 600,
          width: 800,
          fit: "contain",
          withoutEnlargement: true,
        })

        .toBuffer();

      const params = {
        Bucket: bucketName,
        Key: randomImagename,
        Body: buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(params);
      await s3.send(command);

      const token = req.headers.jwt;
      const decoded = jwt_decode(token);
      // const id = mongoose.Types.ObjectId(decoded.id);
      // const user=await UserModel.findOne({_id:id})

      const newPost = await PostModel({
        userId: decoded.id,
        image: randomImagename,
        description: req.body.description,
      });

      newPost.save().then(async (data) => {
        const url = await CreateImgUrl(randomImagename);
        data.imageUrl = url;
        res.status(200).json(data);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// get posts ---------------------------

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    for (const post of posts) {
      if (post.image) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: post.image,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        post.imageUrl = url;
      }
    }
    posts.reverse();

    res.json({ posts: posts });
  } catch (error) {
    console.log(error);
  }
};


const getUserPosts = async (req, res) => {

  try {
     const id = mongoose.Types.ObjectId(req.params.id);
     const posts = await PostModel.find({ userId: id });
    for (const post of posts) {
      if (post.image) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: post.image,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        post.imageUrl = url;
      }
    }
    posts.reverse();
    

    res.json({ posts: posts });
  } catch (error) {
    console.log(error);
    res.send({})
  }

};

const likeUnlike = async (req, res) => {
  try {
    const post = await PostModel.findById(req.body.postId);
    if (!post.like.includes(req.params.id)) {
      await post.updateOne({ $push: { like: req.params.id } });
      const post2 = await PostModel.findById(req.body.postId);
      const likeCount = post2.like.length;
      res.status(200).json({ liked: true, count: likeCount });
    } else {
      await post.updateOne({ $pull: { like: req.params.id } });
      const post2 = await PostModel.findById(req.body.postId);
      const likeCount = post2.like.length;
      res.status(200).json({ liked: false, count: likeCount });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

const getuser = async (req, res) => {
  

  try {
    
  const user = await UserModel.findById(req.body.userId);
 
  if(user.profilePicture){

      const getObjectParams = {
        Bucket: bucketName,
        Key:user.profilePicture,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      user.profilePicture=url

    

  }
  res.json(user);
  } catch (error) {
    console.log(error);
  }


};

const addComment = async (req, res) => {
  const post = await PostModel.findById(req.body.postId);
  const user = await UserModel.findById(req.body.userId);
  const comment = new CommentModel({
    userId: req.body.userId,
    userName: user.username,
    postId: req.body.postId,
    comment: req.body.comment,
  });
  const newComment = await comment.save();

  await post.updateOne({ $push: { comments: newComment._id } });
  res.json(newComment);
};

const addReplyComment = async (req, res) => {
  const comment = await CommentModel.findById(req.body.commentId);
  const user = await UserModel.findById(req.body.userId);
  const replyComment = new replyCommentModel({
    userId: req.body.userId,
    userName: user.username,
    commentId: req.body.commentId,
    postId:comment.postId,
    reply: req.body.reply,
  });
  const newReplyComment = await replyComment.save();

  await comment.updateOne({ $push: { reply: newReplyComment._id } });
  res.json(newReplyComment);
};

const getCommets = async (req, res) => {
  const postId = mongoose.Types.ObjectId(req.body.postId);

  const comments = await commentModel.find({ postId: postId });
  comments.reverse();
  res.json(comments);
};

const getReplyCommets = async (req, res) => {
  const commentId = mongoose.Types.ObjectId(req.params.commetId);

  const replyComments = await replyCommentModel.find({ commentId: commentId });
  replyComments.reverse();
  res.json({ replyComments });
};

// const deleteComment = async (req, res) => {
//   const post = await PostModel.findById(req.body.postId);
//   const comment = new CommentModel({
//     userId: req.body.userId,
//     postId: req.body.postId,
//     comment: req.body.comment,
//   });
//   const newComment = await comment.save();
//   await post.updateOne({ $push: { comments: newComment._id } });
//   const post2 = await PostModel.findById(req.body.postId);
//   res.json({ comment: newComment, post: post });
// };
 
const updateProfile=async(req,res)=>{

  try {
    let data={}
    let send=false
  
    if(req.body.city?.trim()!==""&&req.body.city !=='place'){
      data.city=req.body.city
      send=true
    }
    if(req.body.school?.trim()!==""&&req.body.school!=="school"){
      data.school=req.body.school
      send=true
    }
    if(req.body.bio?.trim()!==""&&req.body.school!=="bio"){
      data.bio=req.body.bio
      send=true
    }
    if(req.body.name?.trim()!==""){
      data.username=req.body.name
      send=true
    }
  
    if(send){
       UserModel.updateOne({_id:req.body.userId},data).then((result)=>{
        data.update=true
        res.json(data)
      })
    }else{
      data.update=false
      res.json(data)
    }
  } catch (error) {
    console.log(error);
  
  }

 
 
}

const profilePictureRemove=async(req,res)=>{

  try {
    
    const user = await UserModel.findById(req.params.id);
  if(user.profilePicture){ 
    // deleting from s3 bucket
    const params = {
      Bucket: bucketName,
      Key:user.profilePicture,
      };
  const command = new DeleteObjectCommand(params)
  await s3.send(command)
  }
  
  await user.updateOne({profilePicture:null})
  
  res.json({remove:true})
  } catch (error) {
    console.log(error);
  }


}
const profilePictureUpdate=async(req,res)=>{

  try {
    const randomImagename =uuidv4();
    
const user = await UserModel.findById(req.params.id);
if(user.profilePicture){ 
  // deleting from s3 bucket
  const params = {
    Bucket: bucketName,
    Key:user.profilePicture,
    };
const command = new DeleteObjectCommand(params)
await s3.send(command)
}



    
const buffer = await sharp(req.file.buffer)
.rotate()
.resize({
  height: 600,
  width: 800,
  fit: "contain",
  withoutEnlargement: true,
})

.toBuffer();

const params = { 
Bucket: bucketName,
Key: randomImagename,
Body: buffer,
ContentType: req.file.mimetype,
};
const command = new PutObjectCommand(params);
await s3.send(command);


await  UserModel.updateOne({_id:req.params.id},{profilePicture:randomImagename})

const url = await CreateImgUrl(randomImagename);

res.status(200).json({update:true,profilePictureUrl:url});


 
  } catch (error) {
    console.log(error);
  }


}

const suggestions=async (req,res)=>{


  try {
    
  const userId=mongoose.Types.ObjectId(req.params.id);

  // const suggestions=await UserModel.aggregate([
  //   { $match: { _id: userId } },
  //   { $unwind: "$followers" },
  //   {$unwind:"$following"}
  // ]).exec()

  // console.log("suggestions;",suggestions);

// -------------------------------------------------------------------------------------------------------
const user = await UserModel.find( { _id:userId });
// console.log("users::",users);
// if(users[0].followers.length > 0) console.log("followers extis")

let followers=user[0].followers 
let following =user[0].following

console.log(following);

// $and:[_id:{$ne:userId},{$and:[ {_id:{$nin:followers} },{ _id: { $nin: following }}]}]
const users=await UserModel.find({$and:[{_id:{$ne:userId}},{$and:[ {_id:{$nin:followers} },{ _id: { $nin: following }}]}]}).limit(5)

//  ?--------------------------------------------------------------------------------------------------------

 for(const user of users) {  
   if (user.profilePicture) {
     const getObjectParams = {
       Bucket: bucketName,
       Key: user.profilePicture,
     };
     const command = new GetObjectCommand(getObjectParams);
     const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
     user.profilePicture = url;
   }
 }
 
 res.json({users})
  } catch (error) {
    console.log(error);
  }


}




const follow=async(req,res)=>{
  try {
    
    await UserModel.updateOne({_id:req.params.userId},{$addToSet:{following:mongoose.Types.ObjectId(req.params.followingId)}})

    await UserModel.updateOne({_id:req.params.followingId},{$addToSet:{followers:mongoose.Types.ObjectId(req.params.userId)}})
  
    res.json({follow:true})
  } catch (error) {
    console.log(error);
    res.json({follow:false})
  }

}


const unFollow=async(req,res)=>{

  try {
    
    await UserModel.updateOne({_id:req.params.userId},{$pull:{following:mongoose.Types.ObjectId(req.params.followingId)}})
console.log("1");
    await UserModel.updateOne({_id:req.params.followingId},{$pull:{followers:mongoose.Types.ObjectId(req.params.userId)}})
  console.log("2");
    res.json({unFollow:true})
  } catch (error) {
    console.log(error);
    res.json({unFollow:false})
  }
}

const search=async(req,res)=>{
  
  try {

    
    console.log( req.query.search);
    console.log(req.params.userId);
    
    const searchInput = req.query.search; // search input
    const currentUserId = req.params.userId; // ID of the current user
    
    if(searchInput.trim()!==""){

      const results = await UserModel.find(
        {
          _id: { $ne: currentUserId }, // exclude current user
          username: { $regex: searchInput, $options: 'i' } // match username with search input
        }
      ).limit(5);

      if(results.length===0){
        console.log("zero");
        res.json({message:true,data:false}) 
        return
      }

      for(const user of results) {  
        if (user.profilePicture) {
          const getObjectParams = {
            Bucket: bucketName,
            Key: user.profilePicture,
          };
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          user.profilePicture = url;
        }
      }
    
      res.json({data:results,message:false})
      console.log("trim");
    }else{
        console.log("notrim");
      res.json(null)
      
    }
  } catch (error) {
    // console.log(error.message);
  }

}

const editpost=async (req,res)=>{

try {
  
  const post =await postModel.findOne({_id:req.params.postId})

  if (post.image) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: post.image,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    post.image = url;
  }


console.log("response sent");
  res.status(200).json(post)
} catch (error) {
  res.json({error:true})
  console.log(error);
}



}

const postUpdate=async(req,res)=>{

console.log(req.body,"req.body");
  try {
    const randomImagename =uuidv4();
    
    let {description,deleteImage}=req.body 
    
    console.log("deleteImage:",deleteImage); 

    if(deleteImage=="true"){

      console.log("delete akki");
    }


    const post =await PostModel.findOne({_id:mongoose.Types.ObjectId(req.body.post)})
    
 
    
      if(!req.file){

        if(!post?.image){
          // no image in previous post
          postModel.updateOne({_id:post._id},{ 
            description: description,
            updated:true,
          }).then((data)=>{
            console.log("data",data);
            res.status(200).json(data);
            return;
          })
        }else{
          // image in previous post
          if(deleteImage=="true"&&description?.trim()!==""){
            // previous image deleted
            const params = {
              Bucket: bucketName,
              Key:post.image,
              };
          const command = new DeleteObjectCommand(params)
          await s3.send(command)

          postModel.updateOne({_id:post._id},{
            description: description,
            image:null,
            updated:true,
          }).then((data)=>{
            console.log("data",data);
            res.status(200).json(data);
            return;
          })

          }else if(description?.trim()!==""){
            // previous image not deleted
            postModel.updateOne({_id:post._id},{
              description: description,
              updated:true,
            }).then((data)=>{
              console.log("data",data);
              res.status(200).json(data);
              return;
            })
          }else if(!deleteImage){
            // previous image not deleted
            const newPost = await PostModel({
              userId: post.userId,
              updatet:true,
              image:post.image, 
              like:post.like,
              comments:post.comments
            });
      
            newPost.save().then((data) => {

             postModel.deleteOne({_id:mongoose.Types.ObjectId(req.body.post)}).then((data)=>{

               res.status(200).json(data);
               return;
             })
            });
          }

        }


       
    
      }else{
        // there is file 

        

       
          const buffer = await sharp(req.file.buffer)
          .rotate() 
          .resize({
            height: 600,
            width: 800,
            fit: "contain",
            withoutEnlargement: true,
          })
          .toBuffer();

        const params = {
          Bucket: bucketName,
          Key: randomImagename,
          Body: buffer,
          ContentType: req.file.mimetype,
        };
        const command = new PutObjectCommand(params);
        await s3.send(command)
      

      if(description?.trim()!==""&&description){
        // there is description 
        console.log(description,"description");
        await postModel.updateOne({_id:post._id},{image: randomImagename,
          description: req.body.description,
          updated:true,
        }).then(async(data)=>{
          console.log(data,"updated data");
          if(post.image){
          
            const params = {
              Bucket: bucketName,
              Key:post.image,
              };
          const command = new DeleteObjectCommand(params)
          await s3.send(command)
          }
          res.status(200).json(data); 
          return;

        });
      
      }else{
        // no description
       await postModel.updateOne({_id:post._id},{image: randomImagename,
          updated:true,
        }).then(async(data)=>{
          console.log(data,"updated data");
          if(post.image){
          
            const params = {
              Bucket: bucketName,
              Key:post.image,
              };
          const command = new DeleteObjectCommand(params)
          await s3.send(command)
          }
          res.status(200).json(data); 
          return;
        })
      }
    
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }

} 


const deletePost=async(req,res)=>{ 
  
  const post =await postModel.findById(req.params.id)

        if(!post?.image){
          console.log("no image");
        }else{
          const params = {
            Bucket: bucketName,
            Key:post.image,
            };
        const command = new DeleteObjectCommand(params)
        await s3.send(command)
        }

   PostModel.deleteOne({_id:mongoose.Types.ObjectId(req.params.id)}).then((data)=>{
    console.log(data);

      commentModel.deleteMany({postId:mongoose.Types.ObjectId(req.params.id)}).then((data)=>{
        console.log(data);
        replyCommentModel.deleteMany({postId:mongoose.Types.ObjectId(req.params.id)}).then((data)=>{
          console.log(data);
        })
     })
   })

   res.status(200).json({delete:true})

  }
 

  const deleteComment=async(req,res)=>{

    try {

      await postModel.updateOne({_id:req.params.postId},{
        $pull:{comments:mongoose.Types.ObjectId(req.params.id)}
      })

      commentModel.deleteOne({_id:req.params.id}).then((data)=>{
        console.log(data);
        replyCommentModel.deleteMany({commentId:req.params.id}).then((data)=>{
          console.log(data);
          res.status(200).json({deleted:true})
        })
      })
      
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }


  }

  const deleteReplyComment=async(req,res)=>{

    try {

      await commentModel.updateOne({_id:req.params.commentId},{
        $pull:{reply:mongoose.Types.ObjectId(req.params.id)}
      })

      replyCommentModel.deleteOne({_id:req.params.id}).then((data)=>{
        console.log(data);
          res.status(200).json({deleted:true})
        
      })
      
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }


  }

const hai=(req,res)=>{
  // console.log("hai"); 
}

module.exports = {
  userPostS3Upload,
  getPosts,
  likeUnlike,
  getuser,
  addComment,
  getCommets,
  addReplyComment,
  getReplyCommets,
  getUserPosts,
  updateProfile,
  profilePictureUpdate,
  profilePictureRemove,
  suggestions,
  follow,
  unFollow,
  search,
  editpost,
  postUpdate,
  deletePost,
  deleteComment,
  deleteReplyComment,
  hai
};
