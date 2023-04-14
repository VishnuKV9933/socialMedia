import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostFormCard from "../Components/PostFormCard";
import PostCard from "../Components/PostCard";
// import SearchCard from "../Components/RoundedCard";
import "../Icons/input.css";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/store";

function Home() {
  const [user, setUser] = useState(null);
  // dispatch to set state
  const dispatch = useDispatch();
  // to get state
  // const posts = useSelector((state) => state.posts);//redux
  const [posts, setPost] = useState([]);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.post("http://localhost:8800/api/users/getuser", {
        userId: userId,
      });
      dispatch(setUser({ user: user.data }));
      setUser(user.data);
    };

    getUser();
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8800/api/users/getposts"
        // {cancelToken: source1.token}
      )
      .then((data) => {
        // redux
        // impoerting from store and adding to state
        // dispatch(
        //   setPosts({ 
        //     posts: data.data.posts,
        //   })
        // );
        setPost(data.data.posts);
      });
  }, []);

const postAlert = () => {
axios.get(`http://localhost:8800/api/users/getposts`).then((data) => {
  console.log("post alert");
  // impoerting from store and adding to state
  // redux
  // dispatch(
  //   setPosts({
  //     posts: data.data.posts,
  //   })
  // );
  setPost(data.data.posts);
});
};

  return (
    <div className=" w-full ">
 


          <div>

            <PostFormCard
              posts={posts}
              setPost={setPost}
               postAlert={postAlert}/>


          </div>

          <div className=" ">
            {posts?.map((post) => {
              return <PostCard key={post._id} post={post} 
              postAlert={postAlert}
              posts={posts}
              setPost={setPost}
              />;
            })}
          </div>

        
     

    </div>
  );
}

export default Home;
