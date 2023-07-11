import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import {GrFormClose} from 'react-icons/gr'
import { useNavigate } from "react-router-dom";
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';

import { defaultProfilePicUrl } from "../Utility/utility"; 
// import it first.
import vi from 'timeago.js/lib/lang/vi';
import { baseUrl } from '../Utility/utility';

timeago.register('vi', vi);
function ReportPostCard({ post,
  posts,
  setPost
  }) {
    const userId = JSON.parse(localStorage.getItem("userId"));
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
  
    // -----------report----------------state------------
  
    const [reportOpen ,setReportOpen] =useState(false)
  
  
  // -----------report----------------state------------
  
  
    useEffect(() => {
      const getPostUser = async () => {
        const user = await axios.post(`${baseUrl}/users/getuser`, {
          userId: post.userId,
        });
      if(!user?.data?.profilePicture){
        
      }else{
        setProfileImage(user?.data?.profilePicture)
      }
      };
  
      getPostUser();
    }, []);
  
  
  
    const {_id}=post
  
    useEffect(()=>{
      if(userId===post.userId){
        setPostOptions(true)
      }
    },[userId])
    
    useEffect(() => {
      setIsLiked(post?.like?.includes(userId) ? true : false);
      setLike(post?.like?.length);
     
    }, [post, userId]);
    
   
  
 

  
  
  
  
    return (
     
        <Card >
  
          {/* ----------------------------------------reportModal------------------------ */}
         
  
          <div 
                        className="flex  bg-white rounded-lg overflow-hidden shadow-xl">
            <div   className=" p-4 w-full ">
              <div className="flex items-center relative">
  
                 
                  {/* -----------------------------------------more options------------------------------------------- */}
                    {more&& 
                  // <div id="moreOptions" className=" w-screen h-screen  absolute top-0 right-0 z-30 p-10" >
  
                      <div  className="w-24 h-fit flex flex-col bg-white absolute top-0 right-0 ">
                       
                            <GrFormClose onClick={(e)=>{
                        e.stopPropagation()
                        setMore(false)} }
                        className="ml-20"  />
  
                     
                    
                  {/* </div> */}
                  
                  </div> 
                  }
                   {/* -----------------------------------------more options------------------------------------------- */}
                <div className="w-12 h-12 mr-4 overflow-hidden rounded-full "> 
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="">
                  <div className="text-lg font-medium">
                    {post.userName}<span className="text-sm ml-4 text-gray-600">{post.updated?<>Updated a Post</>:<>Added a Post</>}</span></div>
                  <div className="text-sm text-gray-500">
                  <TimeAgo
    datetime={post?.updatedAt}
    locale='en'
  />
                  </div>
                </div>
              </div>
              {/* <div className="text-lg font-medium mt-4">Post Title</div> */}
              <div  className="text-gray-600 mt-6 mb-4">{post.description}</div>
              {post.imageUrl && (
                <img src={post.imageUrl} alt="Post" className="w-full h-auto" />
                
              )}
                 
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <div
                    className="w-6 h-6 mr-2"
                   
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
                  <div>{like} likes</div>
                </div>
                <div className="flex items-center">
                  <div  className="w-6 h-6 mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 4h16a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V6a2 2 0 012-2zm2 2v6l4-3 4 3V6H4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>{commentLength} comments</div>
                </div>
              </div>
            </div>
  
          </div>
          <div className="p-3 w-[500px]">
         
  
          </div>
        </Card>
    );
  }
export default ReportPostCard
