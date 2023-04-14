import React from 'react'
import {RiHomeLine,RiChatSmile3Line} from "react-icons/ri"
import {CgProfile,CgMoreR} from "react-icons/cg"
import {MdNotificationsNone} from "react-icons/md"
import {BiLogOutCircle} from "react-icons/bi"
import { useCookies } from "react-cookie";
import {useNavigate, NavLink} from "react-router-dom"
function Navigation() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const logout =() => {
    removeCookie("jwt");
    navigate("/userLogin");
    localStorage.removeItem("userId");                                                         
  };
  return (
    // bg-gradient-to-b from-pink-100  to-blue-100 hover:from-blue-100 hover:to-pink-100
    <div className='w-full  bg-gradient-to-b from-pink-200  to-blue-200 hover:from-blue-200 hover:to-pink-200 rounded-3xl mb-2 flex-row items-center  shadow-lg shadow-gray-200    p-4'>
        <h2>Navigation</h2>
<div className='' >

          <NavLink  to='/' className=" flex items-center   hover:rounded-full hover:ml-6   gap-2 py-3">
            <RiHomeLine className="  w-8 h-8" />
            HOME
            </NavLink>
</div>

          <button onClick={() => navigate('/profile')}  className="flex items-center  hover:rounded-full  hover:ml-6  gap-2 py-3">
            <CgProfile className="w-8 h-8"/>
            PROFILE
            </button>
          <NavLink  to="/" className="flex items-center  hover:rounded-full  hover:ml-6  gap-2 py-3">
            <RiChatSmile3Line className="w-8 h-8"/>
            CHATS
            </NavLink>
          <NavLink  to="/" className="flex items-center   hover:rounded-full  hover:ml-6  gap-2 py-3">
            <MdNotificationsNone className="w-8 h-8"/>
            NOTICE!
            </NavLink>
          <NavLink  to="/" className="flex items-center  hover:rounded-full  hover:ml-6  gap-2 py-3">
            <CgMoreR className="w-8 h-8"/>
            MORE
            </NavLink>
          <button onClick={logout} className="flex items-center  hover:rounded-full  hover:ml-6  gap-2 py-3">
            <BiLogOutCircle className="w-8 h-8"/>
            LOGOUT
            </button>
    </div>

  
  )
}

export default Navigation
