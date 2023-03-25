import axios from "axios";
import React, { useEffect, useState,useContext} from "react";
import Card from "./Card";
import { UserDetailsContext } from "../Context/UserContext";
// import { useInView } from 'react-intersection-observer';


function PostCard({post}) {

  const {userId} =useContext(UserDetailsContext)
  const [isliked, setIsLiked] = useState(post.like.includes(userId));
  const [like, setLike] = useState(post.like.length);
  useEffect(()=>{
    setIsLiked(post.like.includes(userId)?true:false)
    setLike(post.like.length)

  },[post,userId])

  const likeHandler = (postId) => {
    axios.put(`http://localhost:8800/api/users/like/${userId}/unlike`,{postId:postId})
    .then((data)=>{
      setIsLiked(data.data.liked?true:false)
     const likeCount= data.data.count
     setLike(likeCount)
    })
  };
  return (
    <div>
          <Card>
            <div className="flex gap-6 bg-white">
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
           {like } like
            <div>
              <hr />
            </div>

            <div className="grid grid-cols-20 cursor-pointer">
              <div onClick={()=>{
                likeHandler(post._id)
               
              } } className="col-span-4 mt-2 w-5 h-5 ">



{isliked ?
<div className="flex items-center w-6 h-6 gap-6">
<div>
<svg viewBox="0 0 20 20" className="w-full h-full">
    <path fill-rule="evenodd" d="M10 17.583l8.267-8.708C19.787 7.81 20 6.944 20 6c0-3.308-2.692-6-6-6-2.08 0-3.948 1.064-5.033 2.67C7.948 1.064 6.08 0 4 0 1.792 0 0 1.792 0 4c0 .944.213 1.81.733 2.875L9.267 17.583z" class="fill-current text-pink-600"/>
  </svg>
   </div>
</div> 

:

<div className="w-6 h-6">
  <svg viewBox="0 0 20 20" fill="blue" className="w-full h-full">
    <path fill-rule="evenodd" d="M10 17.583l8.267-8.708C19.787 7.81 20 6.944 20 6c0-3.308-2.692-6-6-6-2.08 0-3.948 1.064-5.033 2.67C7.948 1.064 6.08 0 4 0 1.792 0 0 1.792 0 4c0 .944.213 1.81.733 2.875L9.267 17.583z"/>
  </svg>
</div>
}


              






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
