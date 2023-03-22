const dotenv = require("dotenv");
dotenv.config();
const crypto = require("crypto");
const sharp = require("sharp");
const jwt_decode = require("jwt-decode");
// const UserModel =require('../Models/UserModel')
const PostModel = require("../Models/postModel");

// const mongoose = require('mongoose');
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const randomImagename = crypto.randomBytes(32).toString("hex");
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

  try {

   
    if(!req.file){
  const token = req.headers.jwt;
  const decoded = jwt_decode(token);
  console.log(decoded.id);
  // const id = mongoose.Types.ObjectId(decoded.id);
  // const user=await UserModel.findOne({_id:id})

  const newPost = await PostModel({
    userId: decoded.id,
    description: req.body.description,
  });

  newPost.save().then((data) => {
    console.log(data);
  });

  
  res.send({})
    }else{
      const buffer = await sharp(req.file.buffer).rotate()
      .resize({ height: 600, width: 800, fit: "contain",withoutEnlargement:true})
  
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
    console.log(decoded.id);
    // const id = mongoose.Types.ObjectId(decoded.id);
    // const user=await UserModel.findOne({_id:id})
  
    const newPost = await PostModel({
      userId: decoded.id,
      image: randomImagename,
      description: req.body.description,
    });
  
    newPost.save().then((data) => {
      console.log(data);
    });
  
    
    res.send({})

    }
    
  }
  catch(err){
    console.log("catch");
    console.log(err);
  }


};

// get posts ---------------------------

const getPosts = async (req, res) => {

  try {
    const posts = await PostModel.find();

  for (const post of posts) {

    if(post.image){
      const getObjectParams = {
        Bucket: bucketName,
        Key: post.image,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      post.imageUrl=url;
    }
  }
  posts.reverse()

  res.json({posts:posts})
  } catch (error) {
    console.log("get posts catch");
    console.log(error);
  }
  
};

const likeUnlike=async(req,res)=>{
  try {
    
    const post=await PostModel.findById(req.body.postId)
   if(!post.like.includes(req.params.id)){
    console.log("liked");
   await  post.updateOne({$push:{like:req.params.id}})
   res.status(200).json({liked:true})
   }else{

    console.log("unliked");
    await  post.updateOne({$pull:{like:req.params.id}})
    res.status(200).json({liked:false})
   }
  
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  userPostS3Upload,
  getPosts,
  likeUnlike
};
 