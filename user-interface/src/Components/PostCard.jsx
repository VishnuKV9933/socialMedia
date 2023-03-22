import axios from "axios";
import React, { useEffect, useState,useContext} from "react";
import Card from "./Card";
import { UserDetailsContext } from "../Context/UserContext";
function PostCard() {
  const [post, setPost] = useState([]);
  const [like, setLike] = useState(false);
  const {userId} =useContext(UserDetailsContext)
  console.log(post);
  useEffect(()=>{
    
  })
  useEffect(() => {
    axios.get("http://localhost:8800/api/users/getposts").then((data) => {
      
      setPost(data.data.posts);
    });
  }, []);

  const likeHandler = (postId) => {
    axios.put(`http://localhost:8800/api/users/like/${userId}/unlike`,{postId:postId})
    .then((data)=>{

      if(data.data.liked){

        console.log("like");
      }else{
        console.log("unliked");
      }
    })
    console.log(userId);
    

  };

  return (
    <div>
      {post.map((elem) => {
        return (
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
              {elem.imageUrl && (
                <img
                  className="w-full h-full rounded"
                  src={elem.imageUrl}
                  alt="img"
                />
              )}
              <div className="mt-2">{elem.description}</div>
            </div>
            <div>
              <hr />
            </div>

            <div className="grid grid-cols-20 cursor-pointer">
              <div onClick={()=>{
                likeHandler(elem._id)
                console.log(elem.like.length);
              } } className="col-span-4 ">
                like
                {elem.like.length}
              </div>
              <div>comment</div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default PostCard;
