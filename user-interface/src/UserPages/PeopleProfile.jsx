import React, { useEffect, useState,useContext } from "react";
import {  useNavigate,useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { TbSchool } from "react-icons/tb";
import axios from "axios";
import PostCard from "../Components/PostCard";
import "../Icons/input.css";
import { baseUrl, defaultProfilePicUrl } from "../Utility/utility";
import { ChatContext } from "../Context/ChatContext";
import Modal from "../Components/Modal";
const PeopleProfile = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  let { id } = useParams()

  const {setCurrentChat}= useContext(ChatContext)
  const nweConversation={
    members:[id,userId],
    createdAt: Date.now()
  }

 

  const [profile, setProfile] = useState(null);
  const [followersCount, setFollowersCount] = useState(null);
  const [followingCount, setFollowingCount] = useState(null);
  const [postCount, setPostCount] = useState(null);
  const [posts, setPosts] = useState([]);
  const [profilePicOpen, SetProfilePicOpen] = useState(false);
 
  const navigate = useNavigate();


    const [followers,setFollowers]=useState([])

    const  [followersOpen,setFollowersOpen]=useState(false) 

    
    const [following,setFollowing]=useState([])

    const  [followingOpen,setFollowingOpen]=useState(false) 
  
  

  useEffect(() => {
    // const userId = JSON.parse(localStorage.getItem("id"));
    // if (!userId) {
    //   navigate("/");
    // }
    const getUser = async () => {
      
      const user = await axios.post(`${baseUrl}/users/getuser`, {
        userId: id,
      });

      console.log("user.data");
      console.log(user.data);

      setProfile(user.data);
      setFollowersCount(user.data.followers.length);
      setFollowingCount(user.data.following.length);
      setPostCount(user.data.posts.length);
     
     
    };

    
      getUser();
    
  }, [id]);

 

  useEffect(() => {
    const getPost = async () => {
      try {
        console.log(id);
        axios
          .get(`${baseUrl}/users/userpost/${id}`)
          .then((data) => {
            setPosts(data.data.posts);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };

    getPost();
  }, [id]);

  const sendMessage=()=>{
    setCurrentChat(nweConversation)
    navigate('/chat')
  }

  useEffect(()=>{
    const getFollowers=async()=>{
 
      const res=await axios.get(`${baseUrl}/users/getfollowers/${id}`)
 
      setFollowers(res.data)

      const response=await axios.get(`${baseUrl}/users/getfollowing/${id}`)
 
      setFollowing(response.data)
 
    }
 
    getFollowers()
   },[])
 

  return (
    <div className="w-full ">


<Modal
        
        onClose={() => {
          setFollowersOpen(false)
        }}
        open={followersOpen}
      >
  <div className="w-48 h-48 overflow-y-scroll text-zinc-600 bg-blue-200">
              <div className="font-semibold text-zinc-900 flex w-full justify-center">
              Followers

</div>
  {followers.map((elem)=>{
    return <div key={elem?._id}>
    <div  className="font-medium text-sm ml-3 mb-2">{elem.username}</div>
    </div>
  })}
</div>
      </Modal>

      <Modal
        
        onClose={() => {
          setFollowingOpen(false)
        }}
        open={followingOpen}
      >
  <div className="w-48 h-48 overflow-y-scroll text-zinc-600 bg-blue-200">
              <div className="font-semibold text-zinc-900 flex w-full justify-center">
              Following

</div>
  {following.map((elem)=>{
    return <div key={elem._id}>
    <div  className="font-medium text-sm ml-3 mb-2">{elem.username}</div>
    </div>
  })}
</div>
      </Modal>

      {/* ---------------------------------edit details----------------------------------- */}
      {/* --------------------------------------------edit Profile Pic--------------------------------- */}


      {/* --------------------------------------------edit Profile Pic--------------------------------- */}

     
     

      <div className=" z-10  w-full ">
        <div className="">
          {/* ----------------------------------------------------------put content below this till right---------------------------------------------------------------- */}

          {/* ----------------------------------------------------------Profile main div---------------------------------------------------------------- */}

          <div className="w-full h-96 bg-white drop-shadow-xl  rounded-md flex relative">
            {/* ----------------------------------------------------------Profile picture---------------------------------------------------------------- */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                console.log("opennnn");
                SetProfilePicOpen(true);
                console.log("----------check6-----------");

                console.log(profilePicOpen);
                console.log("click3");

              }}
              className="w-28 h-28 flex justify-center items-center  rounded-full bg-blue-200 overflow-hidden absolute z-10 bottom-56  left-10 P-3"
            >
              <div className="">
                <div className=" w-44  rounded-full overflow-hidden ">
                  <img className="" src={profile?.profilePicture?profile?.profilePicture: defaultProfilePicUrl} alt="img" />
                </div>
              </div>
            </div>
            {/* ----------------------------------------------------------Profile picture---------------------------------------------------------------- */}
            {/* ----------------------------------------------------------banner---------------------------------------------------------------- */}
            <div className="w-full ml-2 mr-2 mt-2 mb-2 bg-slate-400 pb-2  ">
              <div id="banner image" className="w-full h-1/2 z-0">
                <img
                  className="w-full h-full "
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL7jzK2ICaXPQX22easResZcneq_RMcA_V6y4PFTFCog&usqp=CAU&ec=48665701"
                  alt="img"
                />
              </div>
            </div>

            {/* ----------------------------------------------------------banner---------------------------------------------------------------- */}
            {/* ----------------------------------------------------------profiledetails---------------------------------------------------------------- */}

            <div
              style={{ marginLeft: "5%", marginRight: "5%" }}
              className="h-64 bg-white w-w90 rounded-md absolute bottom-6 overflow-hidden"
            >
              <div className=" ">
                <div className="w-full h-auto   flex-wrap">
                  <div className=" w-full h-auto flex flex-col items-center justify-center  ">
                    <div className="mt-4 font-sans font-extrabold ">
                      {profile ? profile.username : ""}
                    </div>
                    <div className="text-sm flex">
                      <CiLocationOn className="mt-1" />
                      {profile
                        ? profile.city?profile.city:"Location not added"
                          
                          : "Location not added"
                     }
                    </div>
                    <div className="text-sm flex gap-1">
                      <TbSchool className="mt-1" />
                      {profile
                        ? profile.school?profile.school:"School not added"
                          
                          : "School not added"
                        }
                    </div>
                  </div>
                  <div className=" w-full h-14  flex justify-center gap-4 mt-4 ">
                    <followers className="flex-col justify-center items-center   p-1">
                      <div
                      onClick={()=>{
                        setFollowersOpen(true)
                      }}
                      className="font-serif text-ssm cursor-pointer">Followers</div>
                      <div className="font-serif ">{followersCount}</div>
                    </followers>
                    <following
                    onClick={()=>{
                      setFollowingOpen(true)
                    }}
                     className="flex-col justify-center items-center cursor-pointer p-1">
                      <div className="font-serif text-ssm">Following</div>
                      <div className="font-serif ml-3">{followingCount}</div>
                    </following>
                    <posts className="flex-col justify-center items-center  p-1">
                      <div className="font-serif text-ssm">Posts</div>
                      <div className="font-serif">{postCount}</div>
                    </posts>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-8 ">
                <button
                  onClick={()=>{sendMessage()}}
                  className="border-2 rounded-full border-blue-600  text-blue-600 font-serif text-ssm p-1 transition-all	
                  hover:bg-blue-600 hover:text-white hover:font-semibold"
                >
                  Message
                </button>
              </div>

              <div className="ml-10 font-serif text-sm">Bio</div>
              <div className="text-ssm px-8 py-2 ">
                {profile ?
                   profile.bio?profile.bio:"Bio not added"
                   : "Bio not added"}  
              </div>
            </div>
            {/* ----------------------------------------------------------profiledetails---------------------------------------------------------------- */}
          </div>
          {/* ----------------------------------------------------------Profile main div---------------------------------------------------------------- */}

          {/* =======================================posts====================================================================== */}

          <div className="">
            {posts.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })}
          </div>

          {/* =======================================posts====================================================================== */}

          {/* -----------------------------------------------------------------------right---------------------------------------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default PeopleProfile;
