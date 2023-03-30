import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Card from "./Card";
import { UserDetailsContext } from "../Context/UserContext";
import CommendModal from "./CommentModal";
// import { useInView } from 'react-intersection-observer';

function PostCard({ post ,change,setChange }) {
  const [limit, setLimit] = useState(0);
  const { userId } = useContext(UserDetailsContext);
  const [isliked, setIsLiked] = useState(post.like.includes(userId));
  const [like, setLike] = useState(post.like.length);
  const [commentLength,setCommentLenght]=useState(post.comments.length)
  const [openComment, setopenComment] = useState(false);
 
  const {_id}=post
  const commentIds={postId:_id,userId:userId}
  
  useEffect(() => {
    setIsLiked(post.like.includes(userId) ? true : false);
    setLike(post.like.length);
   
  }, [post, userId]);
  
 const commentHandler=()=>{

  setCommentLenght(commentLength+1)
  console.log("times");

 }


  const likeHandler = (postId) => {
    axios
      .put(`http://localhost:8800/api/users/like/${userId}/unlike`, {
        postId: postId,
      })
      .then((data) => {
        setIsLiked(data.data.liked ? true : false);
        const likeCount = data.data.count;
        setLike(likeCount);
      });
  };
  return (

      <Card>
        <div className="flex  bg-white rounded-lg overflow-hidden shadow-xl">
          <div className="p-4 w-full ">
            <div className="flex items-center">
              <div className="w-12 h-12 mr-4 overflow-hidden rounded-full">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-lg font-medium">John Doe</div>
                <div className="text-sm text-gray-500">2 hours ago</div>
              </div>
            </div>
            {/* <div className="text-lg font-medium mt-4">Post Title</div> */}
            <div className="text-gray-600 mt-6 mb-4">{post.description}</div>
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
                <div>{like} likes</div>
              </div>
              <div className="flex items-center">
                <div onClick={()=>{
                  setopenComment(true)
                  setLimit(1)
                  // console.log(openComment);
                  }} className="w-6 h-6 mr-2">
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
        <CommendModal limit={limit} setLimit={setLimit} post={post} commentHandler={commentHandler}
         isvisible={openComment} setOpen={setopenComment}  commentIds={commentIds}/>
      </Card>
  );
}

export default PostCard;
