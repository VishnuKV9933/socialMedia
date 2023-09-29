import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostFormCard from "../Components/PostFormCard";
import PostCard from "../Components/PostCard";
// import SearchCard from "../Components/RoundedCard";
import "../Icons/input.css";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/store";
import userService from "../ServiceLayer/userSevice";

function Home() {
  const [user, setUser] = useState(null);
  // dispatch to set state
  const dispatch = useDispatch();
  // to get state
  // const posts = useSelector((state) => state.posts);//redux
  const [posts, setPost] = useState([]);
  const navigate = useNavigate();
  // const userId = JSON.parse(localStorage.getItem("userId"));
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const getUser = async () => {
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
    // axiosInstance
    //   .get(
    //     `/users/getposts/${userId}`
    //     // {cancelToken: source1.token}
    //   )
    //   .then((data) => {
    //     // redux
    //     // impoerting from store and adding to state
    //     // dispatch(
    //     //   setPosts({
    //     //     posts: data.data.posts,
    //     //   })
    //     // );
    //     setPost(data.data.posts);
    //   });
  }, []);

  const postAlert = async () => {
    const data = await userService.getPosts(userId);
    setPost(data.posts);
      // impoerting from store and adding to state
      // redux
      // dispatch(
      //   setPosts({
      //     posts: data.data.posts,
      //   })
      // );
      setPost(data.posts);
   
  };

  return (
    <div className=" w-full ">
      <div>
        <PostFormCard posts={posts} setPost={setPost} postAlert={postAlert} />
      </div>

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
    </div>
  );
}

export default Home;
