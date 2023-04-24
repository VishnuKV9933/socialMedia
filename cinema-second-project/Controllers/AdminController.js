const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const UserModel = require("../Models/UserModel");
const ReportedModel = require("../Models/ReportedModel");
const Postmodel = require("../Models/postModel");
const { CreateImgUrl } = require("../otherFiles/s3");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const postModel = require("../Models/postModel");

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

const allUsers = async (req, res) => {
  try {
    const Users = await UserModel.find();
    res.status(200).json(Users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const blockUnblock = async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user.block) {
    const response = await UserModel.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { block: true }
    );
    res.status(200).json(response);
  } else {
    const response = await UserModel.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { block: false }
    );
    res.status(200).json(response);
  }
};

const reportPost = async (req, res) => {
  console.log(req.body);

  try {
    const response = await UserModel.updateOne(
      { _id: mongoose.Types.ObjectId(req.body.userId) },
      { $addToSet: { reportedPost: mongoose.Types.ObjectId(req.body.postId) } }
    );

    const reportedPost = await ReportedModel.findOne({
      postId: mongoose.Types.ObjectId(req.body.postId),
    });

    if (!reportedPost) {
      const newReport = await ReportedModel({
        postId: mongoose.Types.ObjectId(req.body.postId),
        postOwner: req.body.postUser,
        reportDeteils: [
          {
            userId: mongoose.Types.ObjectId(req.body.userId),
            reason: req.body.reason,
          },
        ],
      });

      const response = await newReport.save();
      res.status(200).json(response);
    } else {
      const response = await ReportedModel.updateOne(
        { postId: mongoose.Types.ObjectId(req.body.postId) },
        {
          $push: {
            reportDeteils: {
              userId: mongoose.Types.ObjectId(req.body.userId),
              reason: req.body.reason,
            },
          },
        }
      );

      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getReportedPosts = async (req, res) => {
  try {
    const reportedPost = await ReportedModel.find({ blocked: false });

    res.status(200).json(reportedPost);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Postmodel.findById(req.params.postId);

    if (post.image) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: post.image,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      post.imageUrl = url;
    }

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


const hidePost=async(req,res)=>{

  try {
    
    
    await postModel.updateOne({_id:mongoose.Types.ObjectId(req.params.id)},{
      blocked:true
    })
    
    const response =await ReportedModel.updateOne({postId:mongoose.Types.ObjectId(req.params.id)},{
      blocked:true
    })
    
      res.status(200).json(response)
  } catch (error) {
    console.log(error);
    res.json(500).json(error)
  }

}

module.exports = {
  allUsers,
  blockUnblock,
  reportPost,
  getReportedPosts,
  getPost,
  hidePost
};
