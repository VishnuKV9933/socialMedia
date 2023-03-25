import React, { useEffect,useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navigation from "../Components/Navigation";
import PostFormCard from "../Components/PostFormCard";
import PostCard from "../Components/PostCard";
import { UserDetailsContext } from "../Context/UserContext";

function Home() {
  // const CancelToken =axios.CancelToken;
  // const source1=CancelToken.source();
  const [posts, setPost] = useState([]);
  const {setUserId} =useContext(UserDetailsContext)
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  
  const postAlert=()=>{
    axios.get("http://localhost:8800/api/users/getposts",
    
    ).then((data) => {
      
      setPost(data.data.posts);

    });
  }
  useEffect(() => {
    axios.get("http://localhost:8800/api/users/getposts",
    // {cancelToken: source1.token}
    ).then((data) => {
      
      setPost(data.data.posts);

    });
 
  }, []);

  useEffect(()=>{

  })

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/userLogin");
      } else {
        const { data } = await axios.post(
          "http://localhost:8800/api/auth",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/userLogin");
        } else {
          setUserId(data.user._id)
          // toast(`HI ${data.user}`, { theam: "dark" });
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  return (
    <div
      className="grid xl:grid-cols-20 mx-2 mt-4 
    lg:grid-cols-20 mx-2 mt-4  border-emerald-500 px-10 gap-1
     md:grid-cols-20 mx-2 mt-4 
    sm:grid-cols-20 mx-1 mt-2">
      <div 
        className="xl:col-span-4 xl:max-w-full
       lg:col-span-5 lg:max-w-9/10 
      md:col-span-5
      sm:col-span-6 sm:block
      hidden">
        <Navigation/>

     
      </div>
    
      <div
      className="xl:col-span-12
      lg:col-span-12 ml-3
      md:col-span-12
      sm:col-span-12
      col-span-12">

<PostFormCard posts={posts} setPost={setPost} postAlert={postAlert}/>
{posts.map((post) => {
        return (
      <PostCard post={post} />
        );
      })}

      </div>


   
    
   
      {/* <ToastContainer/> */}
    </div>
  );
}

export default Home;
