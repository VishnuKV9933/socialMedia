import axios from "axios";
import React, { useEffect, useState, useContext, useRef } from "react";
import Card from "./Card";
import CommendModal from "./CommentModal";
import {RiMoreFill} from 'react-icons/ri'
import {GrFormClose} from 'react-icons/gr'
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import EditPost from './EditPost'
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
// import {io} from 'socket.io-client'
import { defaultProfilePicUrl,baseUrl } from "../Utility/utility";
// import it first.
import vi from 'timeago.js/lib/lang/vi';
import RepostPost from "./ReportPost";
timeago.register('vi', vi);

// import { useInView } from 'react-intersection-observer';

function PostCard({ post,
  posts,
  setPost
  }){
   // const userId = JSON.parse(localStorage.getItem("userId"));
   const userId = localStorage.getItem("userId");
  const [limit, setLimit] = useState(0);
  const [isliked, setIsLiked] = useState(post?.like?.includes(userId));
  const [like, setLike] = useState(post?.like?.length);
  const [commentLength,setCommentLenght]=useState(post?.comments?.length)
  const [openComment, setopenComment] = useState(false);
  const [more,setMore]=useState(false)
  const [postOptions,setPostOptions]=useState(false)
  const [editOpen,setEditOpen]=useState(false)
  const [deleteOpen,setDeleteOpen]=useState(false)
  const [profileImage,setProfileImage]=useState(defaultProfilePicUrl)
  const [postUser,setPostUser]=useState(null)

  const [likedUser,setLikedUser]=useState([])

  const [likeOpen,setLikeOpen]=useState(false)
//   const socket =useRef()
//   useEffect(()=>{
 
    
//     socket.current=io('ws://localhost:8900')
    
//     socket.current.emit("addUser",userId)
    
//         const senderId="6442b9959e441b08eac6cf75"
    
//         const receiverId="6442ba049e441b08eac6cf95"
    
//         const data={senderId,receiverId}

//     socket.current.emit("sendPost",data)
    

// },[])


  // -----------report----------------state------------

  const [reportOpen ,setReportOpen] =useState(false)


// -----------report----------------state------------

  const navigate =useNavigate()



  useEffect(() => {
    const getPostUser = async () => {
      const user = await axios.post(`${baseUrl}/users/getuser`, {
        userId: post.userId,
      });
      setPostUser(user.data)
    if(!user?.data?.profilePicture){
      
    }else{
      setProfileImage(user?.data?.profilePicture)
    }
    };

    getPostUser();
  }, []);



  const {_id}=post
  const commentIds={postId:_id,userId:userId}

  useEffect(()=>{
    if(userId===post.userId){
      setPostOptions(true)
    }
  },[userId])
  
  useEffect(() => {
    setIsLiked(post?.like?.includes(userId) ? true : false);
    setLike(post?.like?.length);
   
  }, [post, userId]);
  
 const commentHandler=()=>{

  setCommentLenght(commentLength+1)

 }

  const likeHandler = (postId) => {
    axios
      .put(`${baseUrl}/users/like/${userId}/unlike`, {
        postId: postId,
      })
      .then((data) => {
        setIsLiked(data.data.liked ? true : false);
        const likeCount = data.data.count;
        setLike(likeCount);
      });
      const Obj=post
      Obj.likerId=userId
      axios.post(`${baseUrl}/notification/likepost`,Obj).then((data)=>{
      })
  };

  const  deletPost=async() =>{
    try {
        axios.delete(`${baseUrl}/users/deletepost/${_id}`).then((data)=>{
         
     
    axios.get(`${baseUrl}/users/getposts/${userId}`).then((data) => {
    setPost(data.data.posts);
  })
  .catch((data)=>console.log(data))
  ;
        } )
      setDeleteOpen(false)
      setMore(false)
    } catch (error) {
      console.log(error);
    }

      
  }
  
  useEffect(()=>{

    const likedUsers=async()=>{
      
      const res =await axios.get(`${baseUrl}/users/getlikedpeople/${post._id}`)
      setLikedUser(res.data)
    }
    likedUsers()
  },[])
  
  const postCaller =async () => {

     axios.get(`${baseUrl}/users/getposts/${userId}`).then((data) => {
  
         setPost(data.data.posts )
       
     });
   };
   


  return (
   
      <Card >

        {/* ----------------------------------------reportModal------------------------ */}
        <Modal 
         onClose={() => { 
          setReportOpen(false)
          setMore(false)
        
          }}
        open={reportOpen} >
          <div className="w-40 h-fit ">
         <RepostPost setReportOpen={setReportOpen} setMore={ setMore} setPost={setPost} postUser={post.userName} postId={post._id}/>

          </div>
       </Modal>

        <Modal 
         onClose={() => { 
          setEditOpen(false)
          setMore(false)
          }}
        open={editOpen} >
          <div className="w-72 h-fit">
          <EditPost postId={_id} setEditOpen={setEditOpen} postCaller={postCaller} setMore={setMore} 
           setPost={setPost} posts={posts}></EditPost>

          </div>
       </Modal>


       <Modal 
         onClose={() => { 
          setDeleteOpen(false)
          setMore(false)
          }}
        open={deleteOpen} >
          <div className="w-60 h-fit">
            <div className="flex justify-center gap-12 items-center h-28">
              <button onClick={()=>{deletPost()}} >Delete</button>
              <button onClick={()=>{
                 setDeleteOpen(false)
                 setMore(false)
              }}>Cancel</button>
            </div>

          </div>
       </Modal> 
       <Modal 
         onClose={() => { 
         setLikeOpen(false)
          }}
        open={likeOpen} >

            <div className="w-48 h-24 text-zinc-600 bg-blue-200">
              <div className="font-semibold text-zinc-900 flex w-full justify-center">
              Liked People

              </div>
          {likedUser.map((elem)=>{
            return <>
            <div className="font-medium text-sm ml-3 mb-2 hover:font-semibold	">{elem.username}</div>

            </>
          })}
          </div>
         
       </Modal>
        <div 
                      className="flex  bg-white rounded-lg overflow-hidden shadow-xl">
          <div   className=" p-4 w-full ">
            <div className="flex items-center relative">

                <div  onClick={(e)=>{
                  e.stopPropagation()
                  setMore(true)}} className="hover:cursor-pointer absolute top-0 right-0">
                      
                  <RiMoreFill/> 
                </div>
                {/* -----------------------------------------more options------------------------------------------- */}
                  {more&& 
                // <div id="moreOptions" className=" w-screen h-screen  absolute top-0 right-0 z-30 p-10" >

                    <div  className="w-24 h-fit flex flex-col bg-white absolute top-0 right-0 ">
                     
                          <GrFormClose onClick={(e)=>{
                      e.stopPropagation()
                      setMore(false)} }
                      className="ml-20"  />

                   
                  {postOptions?( <div className="rounded-md">

                    <div onClick={()=>{setEditOpen(true)}} id="moreClose" className="w-full p-1 flex justify-center 
                text-blue-900    rounded-t-md drop-shadow-2xl content-center  border-2 cursor-default hover:bg-blue-200">Edit post</div>

                    <div onClick={()=>{setDeleteOpen(true)}} className="w-full p-1 flex justify-center drop-shadow-2xl content-center
                 text-blue-900    rounded-b-md border-2 cursor-default hover:bg-blue-200">Delete post</div>
                    
                  </div>
                  ):
                  <div onClick={()=>
                     setReportOpen(true)
                    
                    }
                  className="w-full p-1 flex justify-center content-center drop-shadow-2xl overflow-visible 
                  text-blue-900   rounded-md border-2 cursor-default hover:bg-blue-200">Report post</div>}
                {/* </div> */}
                
                </div> 
                }
                 {/* -----------------------------------------more options------------------------------------------- */}
              <div className="w-12 h-12 mr-4  overflow-hidden rounded-full transition-all"> 
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="">
                <div onClick={() => navigate(`/peopleprofile/${post?.userId}`)} className="text-lg font-medium text-blue-900  transition-all">
                  {postUser?.username}<span className="text-sm ml-4 text-gray-600 text-blue-900">{post.updated?<>Updated a Post</>:<>Added a Post</>}</span></div>
                <div className="text-sm text-gray-500">
                <TimeAgo
  datetime={post?.updatedAt}
  locale='en'
/>
                </div>
              </div>
            </div>
            {/* <div className="text-lg font-medium mt-4">Post Title</div> */}
            <div  className="text-gray-600 mt-6 mb-4 text-blue-900">{post.description}</div>
            {post.imageUrl && (
              <img src={post.imageUrl} alt="Post" className="w-full h-auto" />
              
            )}
               
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <div
                  className="w-6 h-6 mr-2"
                  onClick={() => {
                    likeHandler(post._id);
                  }}
                >
                  {isliked ? (
                    <div className="flex items-center w-6 h-6 gap-6">
                      <div>
                        <svg viewBox="0 0 20 20" className="w-full h-full">
                          <path
                            fill-rule="evenodd"
                            d="M10 17.583l8.267-8.708C19.787 7.81 20 6.944 20 6c0-3.308-2.692-6-6-6-2.08 0-3.948 1.064-5.033 2.67C7.948 1.064 6.08 0 4 0 1.792 0 0 1.792 0 4c0 .944.213 1.81.733 2.875L9.267 17.583z"
                            class="fill-current text-pink-600"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                       fill="#ADD8E6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 17.583l8.267-8.708C19.787 7.81 20 6.944 20 6c0-3.308-2.692-6-6-6-2.08 0-3.948 1.064-5.033 2.67C7.948 1.064 6.08 0 4 0 1.792 0 0 1.792 0 4c0 .944.213 1.81.733 2.875L9.267 17.583z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="cursor-default text-blue-900 font-medium" onClick={()=>{setLikeOpen(true)}}
                >{like} Likes</div>
              </div>
              <div className="flex items-center">
                <div onClick={()=>{
                  setopenComment(true)
                  setLimit(1)
                  }} className="w-6 h-6 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path className="text-blue-900"
                      fillRule="evenodd"
                      d="M2 4h16a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V6a2 2 0 012-2zm2 2v6l4-3 4 3V6H4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-blue-900 font-medium">{commentLength} Comments</div>
              </div>
            </div>
          </div>

        </div>
        <div className="p-3 w-[500px]">
        <CommendModal limit={limit} setLimit={setLimit} post={post} commentHandler={commentHandler}
         isvisible={openComment} setOpen={setopenComment} commentLength={commentLength}
          setCommentLenght={setCommentLenght} commentIds={commentIds}/>

        </div>
      </Card>
  );
}

export default PostCard;
