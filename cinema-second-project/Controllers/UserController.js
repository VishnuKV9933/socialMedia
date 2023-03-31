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
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const commentModel = require("../Models/commentModel");

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
  const post = await UserModel.findById(req.body.userId);
  res.json(post);
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

const deleteComment = async (req, res) => {
  const post = await PostModel.findById(req.body.postId);
  const comment = new CommentModel({
    userId: req.body.userId,
    postId: req.body.postId,
    comment: req.body.comment,
  });
  const newComment = await comment.save();
  await post.updateOne({ $push: { comments: newComment._id } });
  const post2 = await PostModel.findById(req.body.postId);
  res.json({ comment: newComment, post: post });
};

module.exports = {
  userPostS3Upload,
  getPosts,
  likeUnlike,
  getuser,
  addComment,
  getCommets,
  addReplyComment,
  getReplyCommets,
};
