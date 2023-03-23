import axios from "axios";
import React, { useEffect, useState,useContext, useId} from "react";
import Card from "./Card";
import { UserDetailsContext } from "../Context/UserContext";
import Like from "./Like";
import LikeImage from './LikeImage'


function PostCard({post}) {
  const {userId} =useContext(UserDetailsContext)
  const [isliked, setIsLiked] = useState(post.like.includes(userId));
  const [like, setLike] = useState(null);
  useEffect(()=>{
    setLike(post.like.length)
  },[])
  const likeHandler = (postId) => {
    axios.put(`http://localhost:8800/api/users/like/${userId}/unlike`,{postId:postId})
    .then((data)=>{
     const likeCount= data.data.count
     setLike(likeCount)
     setIsLiked(!isliked)
    })
  };


  return (
    <div>
          <Card>
            <div className="flex gap-6">
              <div className="w-12 rounded-full overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6tYl-IikcR09ow-_H9yFcUpQgV7aWYTobF5-qERbl2yJmM458f_EBJy0&s"
                  alt="img"
                />
              </div>
              <div className="flex flex-col  justify-end items-start  h-12">
                <div> name</div>
                <div> 2 hours ago</div>
              </div>
            </div>
            <div className="w-full h-full bg-white-300 mb-5 mt-5">
              <div className="mt-2">{post.description}</div>
              {post.imageUrl && (
                <img
                  className="w-full h-full rounded"
                  src={post.imageUrl}
                  alt="img"
                />
              )}
            </div>
            <Like Like={like} />
            <div>
              <hr />
            </div>

            <div className="grid grid-cols-20 cursor-pointer">
              <div onClick={()=>{
                likeHandler(post._id)
               
              } } className="col-span-4 mt-2 w-5 h-5 ">

              <LikeImage isliked={isliked} />
              </div>
              <div>
                  comment
   </div>
            </div>
          </Card>
      
    </div>
  );
}

export default PostCard;
