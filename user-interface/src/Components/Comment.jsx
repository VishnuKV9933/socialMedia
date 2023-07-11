import axios from "axios";
import React, { useState,useRef, useContext, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import ReplyComment from "./ReplyComment";
import { CommentContextSet } from "../Context/CommetContext";
import { baseUrl } from "../Utility/utility";
function Comment({ comment,postUserId,postId,setArrayLength,limit,commetnReducer,post}) {


  const textareaRef = useRef(null);

  const [replyLimit, setReplyLimit] = useState(1);

  const [openReply, setopenReply] = useState(false);

  const [replyComment, setReplyComment] = useState("");

  const [replyCount, setReplyCount] = useState(comment.reply.length);

  const [allReplyComments, setReplyAllComments] = useState([]);

  const [deleteComment,setDeleteComment]=useState(false)

  const [deleteAllComment,setDleteAllComment]=useState(false)

  const userId = JSON.parse(localStorage.getItem("userId"));
  
  const {allComments, setAllComments}=useContext(CommentContextSet);

  useEffect(()=>{

    const userId = JSON.parse(localStorage.getItem("userId"));
    if(userId===comment.userId){
      setDeleteComment(true)
    }

    if(userId===postUserId){
      setDleteAllComment(true)
    }

  },[userId,comment.userId])
 
  
  useEffect(()=>{
   const  getRplayComments=async()=>{ 

const data = await axios.get(`${baseUrl}/users/getreplycomments/${comment._id}`)
    
      setReplyCount(data.data.replyComments.length);
      const array = data.data.replyComments.slice(0, replyLimit * 3);
      setReplyAllComments(array);
   }
   if(openReply) {

     getRplayComments()


   }
 
  },[openReply,comment._id,replyLimit])

  const  getRplayComments=async()=>{ 
    const data = await axios.get(`${baseUrl}/users/getreplycomments/${comment._id}`)
        
    
          setReplyCount(data.data.replyComments.length);
          const array = data.data.replyComments.slice(0, replyLimit * 3);
          setReplyAllComments(array);
       
       }
      


  const getComments = async () => {
    await axios
      .post(`${baseUrl}/users/getcomments`, {
        postId:postId,
      })
      .then((data) => {
         setArrayLength(data.data.length);
         const array = data.data.slice(0, limit * 3);
        setAllComments(array);
      });
  };



  const handleChange=(e)=>{
    setReplyComment(e.target.value)
  }

  const setmore=()=>{
    setReplyLimit(replyLimit+1)
  }
  const setless=()=>{
    setReplyLimit(1)
  }

  const commentDeleter=()=>{

    axios.delete(`${baseUrl}/users/delete/${postId}/comment/${comment._id}`).then(()=>{
      getComments()
    })

  }

  const replyCommentDeleter=(reply)=>{

    axios.delete(`${baseUrl}/users/deletereply/${comment._id}/comment/${reply._id}`).then(()=>{
      // getComments()
      getRplayComments()
    })

  }


  const submit =(e) => {
    try {
    e.preventDefault();
    if (replyComment.trim() !== "") {
      axios
      .put(`${baseUrl}/users/addreplycomments`, {
        userId: userId,
        commentId:comment._id,
        reply:replyComment,
      })
      .then((data) => {
        setReplyAllComments([data.data, ...allReplyComments]);


       const Obj=post
        Obj.commenderId=userId
        Obj.commentOwner=comment.userId
        Obj.reply=replyComment
        axios.post(`${baseUrl}/notification/replycomment`,Obj).then((data)=>{
        })


        setReplyComment("")
        setReplyCount(replyCount+1)
      });
    }
  } catch (error) {
    console.log(error);
  }



  };

  return (
    <div>
      <div className="bg-slate-100 rounded-xl mt-2 mx-2 p-3 text-md">
        <div className="font-medium">{comment.userName}</div>
        <div className=" font-BlinkMacSystemFont text-sm w-auto flex break-all flex  ">
          <div className="">{comment.comment}</div>
        </div>
      </div>
      <div className="flex" id="reply section">
        <div className="ml-6 text-sm text-gray-400">{replyCount}</div>
        <div
          onClick={() => {
            setopenReply(!openReply);
          }}
          className="ml-1  text-sm text-gray-400 hover:text-gray-900 cursor-pointer">
          Reply
        </div>
       { deleteComment||deleteAllComment?<div 
        onClick={()=>{
          commentDeleter()
          commetnReducer()
          replyCommentDeleter()
          
        }}
        className="ml-40 italic text-sm text-gray-400 hover:text-gray-900 cursor-pointer">Delete</div>:<></>}
      </div>
      {/* -----------------------replycomment------------------------------ */}
      {openReply && (
        <div className="mt-2 ml-10 mr-2">

          <form onSubmit={submit} >
          <div className="flex mb-2">
            <textarea ref={textareaRef}
            value={replyComment}
            onChange={handleChange}
            placeholder="write a reply"
            className="  border mr-2  overflow-hidden  rounded-md px-2 py-1" />
            {/* ----------------------------replyCommentButton------------------ */}
            <button
              type="submit"  
              className="flex items-center justify-center mt-3  bg-slate-100 h-8 w-9 rounded-full hover:bg-slate-300"
            >
              <AiOutlineSend className="" />
            </button>
            {/* ----------------------------replyCommentButton------------------ */}
          </div>
          </form>
              {replyLimit > 1 && (

                <div onClick={setless}
                className="ml-3 cursor-pointer mt-1 text-sm text-gray-500">
                  less...
                </div>
              )
          
              }
      
            {
              allReplyComments.map((elem)=>{
                return (
                  <div>
                    <ReplyComment key={elem._id} reply={elem} />
                    <div  

                                          
                      onClick={()=>{                    
                        replyCommentDeleter(elem)
                        
                      }}


                     className="ml-3  text-sm text-gray-400 hover:text-gray-900 cursor-pointer italic">Delete</div>
                  </div>
                 
                )
              })
            }
        {replyLimit*3< replyCount&&
         <div
          onClick={setmore}
          className="ml-3 cursor-pointer mt-1 text-sm text-gray-500" >
          more...
           </div>
        }
        </div>
  
      )}
      {/* -----------------------replycomment------------------------------ */}
    </div>
  );
}

export default Comment;
