import React, { useEffect, useState ,useContext } from "react";
import { Outlet } from "react-router";
import Navigation from "./Components/Navigation";
import ProfileCard from "./Components/ProfileCard";
import Search from "./Components/Search";
import Suggestion from "./Components/Suggestion";
import axios from "axios";
import { UserContext } from "./Context/UserContext";
import { ProfileCardUrlContext } from "./Context/ProflePicContext";
import { baseUrl, defaultProfilePicUrl } from "./Utility/utility";
function LayOut() {
const {profileCardName,setProfileCardName}=useContext(UserContext)
const {profilCardUrl,setProfileCardUrl} = useContext(ProfileCardUrlContext)
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [suggestion, setSuggestion] = useState([]);
  const [user, setUser] = useState(null);
  const [suggestionDisplayController, setSuggestionDisplayController] =useState(true);
  

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.post(`${baseUrl}/users/getuser`, {
        userId: userId,
      });

      setUser(user.data);
      setProfileCardName(user.data.username)
       setProfileCardUrl(user?.data?.profilePicture?user?.data?.profilePicture:defaultProfilePicUrl)
    };

    getUser();
  }, [profileCardName]);


  useEffect(() => {
    axios
      .get(`${baseUrl}/users/getsuggestion/${userId}`)
      .then((res) => {
        setSuggestion(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const suggestionFunction = () => {
    axios
      .get(`${baseUrl}/users/getsuggestion/${userId}`)
      .then((res) => {
        setSuggestion(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchPasser = (searchData, setSeacrhData) => {
    setSuggestionDisplayController(searchData);
  };


  return (
<div className="flex  w-full ">
{/* ---------------------fixed------------------------ */}

<div className="fixed w-full flex">
  <div
    className="bg-white   overflow-hidden
top-0 left-0 right-0
xl:w-w23 h-screen xl:pr-9 xl:pl-2 pt-1
lg:w-w30 lg:pl-4 lg:pr-8
md:w-w25 md:px-2 md:w-w30 md:block hidden "
  >
    <div>
      {" "}
      <ProfileCard name={profileCardName} url={profilCardUrl}/>{" "}
    </div>
    <div className="mt-4">
      <Navigation />
    </div>
  </div>
  {/* -----------------------------layout-------------------- */}

  <div className="md:w-w50 sm:w-full"></div>

  {/* -----------------------------right-------------------- */}

  <div className=" w-w30 hidden md:block lg:w-w27">
    <div className="w-full  h-full ">
      <div className="">

      <Search  searchPasser={searchPasser}/>
      </div>

      <div className="w-full h-5/6  flex flex-col z-80 px-4 ">
        <div className=" mb-12">
          {!suggestionDisplayController && (
            <div>
              <div className="ml-4 font-semibold text-lg	">Suggestion</div>
              <div className="h-fit " >

              <div>
                {suggestion?.map((elem) => {
                  return (
                    <Suggestion
                      key={elem._id}
                      suggestion={elem}
                      suggestionFunction={suggestionFunction}
                      user={user}
                    />
                  );
                })}
              </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

{/* ---------------------fixed------------------------ */}

{/* --------------------------------------------- */}
<div
  className="bg-red-600   overflow-hidden
top-0 left-0 right-0
xl:w-w23 h-screen xl:pr-9 xl:pl-2 pt-1
lg:w-w30 lg:pl-4 lg:pr-8
md:w-w25 md:px-2 md:w-w30 md:block hidden "
></div>

<div className=" z-10 md:w-w50 sm:w-full ">
  <div className=" px-6">
    {/* -----------------------------layout-------------------- */}

    <Outlet />

    {/* -----------------------------right-------------------- */}
  </div>
</div>

<div className="w-w30 hidden md:block lg:w-w27 mt-16"></div>
</div>

  );
}

export default LayOut;



