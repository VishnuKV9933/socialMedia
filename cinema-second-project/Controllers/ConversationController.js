const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const conversationModel =require('../Models/conversationModel')
 

const conversation =async(req,res)=>{

    console.log(req.body.senderId);
    console.log(req.body.receiverId)


    const conversation=new conversationModel({
        members:[ mongoose.Types.ObjectId( req.body.senderId ),mongoose.Types.ObjectId(req.body.receiverId) ]
    })

    try {

        const savedConversation=await conversation.save()

        res.status(200).json(savedConversation)
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const userConversations=async(req,res)=>{
    try {
        console.log("check",req.params.userId);

        const converstaion=await conversationModel.find({members:{$in:mongoose.Types.ObjectId(req.params.userId)}})
        res.status(200).json(converstaion)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const twoUserConversation=async(req,res)=>{

    console.log("req.params.firstId");
    console.log("req.params.secondId");
    console.log(req.params.firstId);
    console.log(req.params.secondId);
    try {
        const conversation=await conversationModel.findOne({
            members:{$all:[mongoose.Types.ObjectId(req.params.firstId),mongoose.Types.ObjectId(req.params.secondId)]}
        })
        console.log(conversation);
        res.status(200).json(conversation)
    } catch (error) {
        console.log(error);
        res.status(200).json(error)
    }
}

module.exports={
    conversation,
    userConversations,
    twoUserConversation
}