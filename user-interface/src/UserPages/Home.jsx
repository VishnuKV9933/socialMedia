import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostFormCard from "../Components/PostFormCard";
import PostCard from "../Components/PostCard";
// import SearchCard from "../Components/RoundedCard";
import "../Icons/input.css";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/store";
import userService from "../ServiceLayer/userSevice";
import { welcomeImage } from "../Utility/utility";

function Home() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const [posts, setPost] = useState([]);
  const navigate = useNavigate();
  // const userId = JSON.parse(localStorage.getItem("userId"));
  const userId = localStorage.getItem("userId")

  console.log(userId,'fdsfsdfd,hoem');

  useEffect(() => {
    const getUser = async () => {
      console.log(userId,'tttttthome');
      const user = await userService.getUser(userId);

      dispatch(setUser({ user: user.data }));
      setUser(user.data);
    };

    getUser();
  }, []);

  useEffect(() => {
    const posts = async () => {
      const data = await userService.getPosts(userId);
      setPost(data.posts);
    };
    posts();
  
  }, []);

  const postAlert = async () => {
    const data = await userService.getPosts(userId);
    setPost(data.posts);

      setPost(data.posts);
   
  };

  return (
    <div className=" w-full ">
      <div>
        <PostFormCard posts={posts} setPost={setPost} postAlert={postAlert} />
      </div>

      {
        posts.length ?

      <div className=" ">
        {posts?.map((post) => {
          return (
            <PostCard
              key={post._id}
              post={post}
              postAlert={postAlert}
              posts={posts}
              setPost={setPost}
            />
          );
        })}
      </div>
      :

      <div className="w-full h-fit ">
        <img className="w-full h-fit" src={welcomeImage} alt="" />
      </div>
      }




    </div>
  );
}

export default Home;
