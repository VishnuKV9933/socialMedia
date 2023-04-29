import React, { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { TbSchool } from "react-icons/tb";
import axios from "axios";
import Modal from "../Components/Modal";
import "../Icons/input.css";
import { baseUrl, defaultProfilePicUrl, fileSelector } from "../Utility/utility";
import { UserContext } from "../Context/UserContext";
import { ProfileCardUrlContext } from "../Context/ProflePicContext";
import PostCard from "../Components/PostCard";
const Profile = () => {
  const {setProfileCardName} =useContext(UserContext)
  const {setProfileCardUrl} =useContext(ProfileCardUrlContext)
  const [profile, setProfile] = useState(null);
  const [followersCount, setFollowersCount] = useState(null);
  const [followingCount, setFollowingCount] = useState(null);
  const [postCount, setPostCount] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isOpon, setIsOpen] = useState(false);
  const [profilePicOpen, SetProfilePicOpen] = useState(false);
  const [place, setPlace] = useState(null);
  const [currentPlace, setCurrentPlace] = useState("location not added");
  const [school, setSchool] = useState(null);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [bio, setBio] = useState(null);
  const [currentBio, setCurrentBio] = useState(null);
  const [name, setProfileUserName] = useState(null);
  const [currentName, setCurrentName] = useState(null);
  const navigate = useNavigate();
// --------------------------------------------------------------------------------------------
  const [profilePictureUrl, setProfilePictureUrl] =
    useState(defaultProfilePicUrl);
  const [changeProfilepicButton, setChangeProfilepicButton] = useState(false);
  const [file, setfile] = useState(null);
  const [profilePicturePreviewUrl, setProfilePicturePreviewUrl] = useState(defaultProfilePicUrl);

  const [following,setFollowing]=useState([])

  const  [followingOpen,setFollowingOpen]=useState(false) 

  const [followers,setFollowers]=useState([])

  const  [followersOpen,setFollowersOpen]=useState(false) 

  const userId = JSON.parse(localStorage.getItem("userId"));

  

  const selectFile = fileSelector(setfile, setProfilePicturePreviewUrl);

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
    const getUser = async () => {
      const userId = JSON.parse(localStorage.getItem("userId"));
      if (!userId) {
        navigate("/");
      }
      
      const user = await axios.post(`${baseUrl}/users/getuser`, {
        userId: userId,
      });
      
   

      setProfile(user.data);
      setFollowersCount(user.data.followers.length);
      setFollowingCount(user.data.following.length);
      setPostCount(user.data.posts.length);
      setPlace(user.data.city);
      setCurrentPlace(user.data.city);
      setSchool(user.data.school);
      setCurrentSchool(user.data.school);
      setBio(user.data.bio);
      setCurrentBio(user.data.bio);

      setProfileUserName(user.data.username);
      setProfileCardName(user.data.username)
      // setprofileCarduser((previous)=>({...previous,name:user.data.username}))
      setCurrentName(user.data.username);
      if (user.data.profilePicture) {
        setProfilePictureUrl(user.data.profilePicture);
        setProfileCardUrl(user.data.profilePicture)
        setProfileCardName(user.data.username)

        setProfilePicturePreviewUrl(user.data.profilePicture);
      } else {
        setProfilePictureUrl(defaultProfilePicUrl);
        setProfilePicturePreviewUrl(defaultProfilePicUrl);
      }
    };

    if (!profile) {
      getUser();
    }
  }, [userId]);

  const detailsSubmit = async (e) => {
    e.preventDefault();
    const data = {
      city: place,
      school: school,
      bio: bio,
      userId: userId,
      name: name,
    };
    await axios
      .put(`${baseUrl}/users/updateprofile`, data)
      .then((res) => {

        console.log("res.data:",res.data);

        if (res.data.update) {
          const { city, bio, school, username } = res.data;
        
          if (username) {
            console.log(username);
            setProfileUserName(username);
            console.log(setProfileUserName);
            
           setProfileCardName(username)
           
           
            // setprofileCarduser((previous)=>({...previous,name:username}))

            setCurrentName(username);
          } else {
            setProfileUserName(currentName);
            // setprofileCarduser((previous)=>({...previous,name:username}))
            setProfileCardName(currentName)
         
           
          } 
          if (city) {
            console.log("city",city);
            setPlace(city);
            setCurrentPlace(city);
          } else {
            setCurrentPlace("location not added");
            setPlace("place");
          }

          if (bio) {
            setBio(bio);
            setCurrentBio(bio);
          } else {
            setBio("bio");
            setCurrentBio("Bio not added");
          }

          if (school) {
            setCurrentSchool(school);
            setSchool(school);
          } else {
            setCurrentSchool("school not added");
            setSchool("school");
          }
        }
      });

    setIsOpen(false);
  };
console.log("currentPlace",currentPlace);
  useEffect(() => {
    const getPost = async () => {
      try {
        axios
          .get(`${baseUrl}/users/userpost/${userId}`)
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
  }, [userId]);

  const removeProfilePicture = () => {
    try {
      if (profilePictureUrl !== defaultProfilePicUrl) {
        axios
          .put(`${baseUrl}/users/removeprofilpicture/${userId}`)
          .then((res) => {
            setProfilePictureUrl(defaultProfilePicUrl);
            setProfileCardUrl(defaultProfilePicUrl)
          });
      }
     
                SetProfilePicOpen(false);
              

    } catch (error) {
      console.log(error);
    }
  };

  const updateProfilePic = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", file[0]);

    axios
      .post(
        `${baseUrl}/users/profilpictureupdate/${userId}`,
        data,
        {
          headers: { ContentType: "multipart/form-data" },
        }
      )
      .then((res) => {
        if (res.data.update) {
          const { profilePictureUrl } = res.data;
          setProfilePictureUrl(profilePictureUrl);
          setProfileCardUrl(profilePictureUrl)
          setChangeProfilepicButton(false);
        }
      
        SetProfilePicOpen(false);
      
      });


  };

  useEffect(()=>{
   const getFollowers=async()=>{

     const res=await axios.get(`${baseUrl}/users/getfollowers/${userId}`)

     const response=await axios.get(`${baseUrl}/users/getfollowing/${userId}`)

     setFollowers(res.data)

     setFollowing(response.data)

   }

   getFollowers()
  },[])


  return (
    <div className="w-full ">
      {/* ---------------------------------edit details----------------------------------- */}

      <Modal
        id="editDetails"
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
        id="editDetails"
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

      <Modal
        id="editDetails"
        onClose={() => {
          setIsOpen(false);
          setSchool(currentSchool);
          setPlace(currentPlace);
          setBio(currentBio);
        }}
        open={isOpon}
      >
        <form onSubmit={detailsSubmit}>
          <div className="w-64 h-64 flex content-center flex-col p-2">
            <div className="flex justify-center mb-4 font-semibold text-">
              <label className="ml-2 ">Edit Details</label>
            </div>
            <input
              onChange={(e) => {
                setProfileUserName(e.target.value);
              }}
              type="text"
              autocomplete="off"
              name="city"
              className="input w-full h-10"
              placeholder={currentName}
            />
            <input
              onChange={(e) => {
                setPlace(e.target.value);
              }}
              type="text"
              autocomplete="off"
              name="city"
              className="input w-full h-10 mt-3"
              placeholder={place ? place : "place"}
            />
            <input
              onChange={(e) => {
                setSchool(e.target.value);
              }}
              type="text"
              autocomplete="off"
              className="input w-full h-10 mt-3"
              placeholder={school ? school : "school"}
            />
            <input
              onChange={(e) => {
                setBio(e.target.value);
              }}
              type="text"
              autocomplete="off"
              className="input w-full h-10 mt-3"
              placeholder={bio ? bio : "bio"}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="w-24 h-8 font-semibold rounded-md bg-blue-100 hover:bg-blue-200 "
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
      {/* --------------------------------------------edit Profile Pic--------------------------------- */}

      <Modal
        onClose={() => {
          setfile(null);
        
          SetProfilePicOpen(false);
        

          setChangeProfilepicButton(false);
        
          setProfilePicturePreviewUrl(profilePictureUrl);
        }}
        open={profilePicOpen}
      >
        <div>
          <div className="w-64 h-fit">
            <img id="profilePocmodalImage" src={profilePicturePreviewUrl} alt="img" />
          </div>
        </div>

        <div className="flex w-full justify-center items-center gap-1 h-12 ">
          <form onSubmit={updateProfilePic}>
            <div className="w-28 h-8 bg-red-400 flex justify-center items-center rounded-md">  
            {
              
            changeProfilepicButton ? (
              file ? (
                
                <button className="w-full h-full rounded-md 
                bg-red-600 w-full h-full flex justify-center items-center
text-white bg-gradient-to-br from-purple-600 to-blue-500 
hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 
dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center 
                " type="submit">OK </button>

              ) : (
                selectFile
                // <div className="bg-red-600 w-full h-full"> selectFile</div>
              )
            ) : (
              <div className="bg-red-300 w-full h-full flex items-center justify-center
              text-white bg-gradient-to-br from-purple-600 to-blue-500 
hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 
dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center "
                onClick={(e) => {
                  setChangeProfilepicButton(true);
                 
                  SetProfilePicOpen(true);
                
                  e.stopPropagation()


                }}
              >Update
              </div>
            )


          }
          </div>
          </form>

          {(changeProfilepicButton && (
            <button className="w-28 h-8 bg-blue-200
             flex justify-center items-center
text-white bg-gradient-to-br from-purple-600 to-blue-500 
hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 
dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center 

            "
              onClick={() => {
                setfile(null);
                setProfilePicturePreviewUrl(profilePictureUrl);
                setChangeProfilepicButton(false);

              }}
            >
              Cancel
            </button>
          )) || <button className="bg-blue-200 w-28 h-8
          text-white bg-gradient-to-br from-purple-600 to-blue-500 
hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 
dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center 
          " onClick={() =>{ 
            removeProfilePicture()

            }}>remove</button>}
        </div>
      </Modal>
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
             
                SetProfilePicOpen(true);
               
              }}
              className="w-28 h-28 flex justify-center items-center  rounded-full bg-blue-200 overflow-hidden absolute z-10 bottom-56  left-10 P-3"
            >
              <div className="">
                <div className=" w-44  rounded-full overflow-hidden ">
                  <img className="" src={profilePictureUrl} alt="img" />
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
                      {profile ? currentName : ""}
                    </div>
                    <div className="text-sm flex">
                      <CiLocationOn className="mt-1" />
                      {
                       
                           currentPlace?currentPlace:
                           "Location not added"
                      
                       }
                    </div>
                    <div className="text-sm flex gap-1">
                      <TbSchool className="mt-1" />
                      {
                    
                           currentSchool?currentSchool
                          : "School not added"
              }
                    </div>
                  </div>
                  <div className=" w-full h-14  flex justify-center gap-4 mt-4 ">
                    <followers className="flex-col justify-center items-center cursor-pointer   p-1">
                      <div onClick={()=>{
                        setFollowersOpen(true)
                      }} className="font-serif text-ssm">Followers</div>
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

              <div className="absolute top-4 right-8 transition-all">
                <button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className="border-2  rounded-full border-blue-600  text-blue-600 font-serif text-ssm p-1 hover:bg-blue-600 hover:text-white hover:font-semibold transition-all"
                >
                  Edit details
                </button>
              </div>

              <div className="ml-10 font-serif text-sm">Bio</div>
              <div className="text-ssm px-8 py-2 ">
                {  currentBio?currentBio : "Bio not added"}
              </div>
            </div>
            {/* ----------------------------------------------------------profiledetails---------------------------------------------------------------- */}
          </div>
          {/* ----------------------------------------------------------Profile main div---------------------------------------------------------------- */}

          {/* =======================================posts====================================================================== */}

          <div className="">
            {posts.map((post) => {
              return <PostCard key={post._id} setPosts={setPosts} post={post} />;
            })}
          </div>

          {/* =======================================posts====================================================================== */}

          {/* -----------------------------------------------------------------------right---------------------------------------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
