import React from 'react'
import {RiHomeLine,RiChatSmile3Line} from "react-icons/ri"
import {CgProfile,CgMoreR} from "react-icons/cg"
import {MdNotificationsNone} from "react-icons/md"
import {BiLogOutCircle} from "react-icons/bi"
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom"
function Navigation() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const logout =() => {
    removeCookie("jwt");
    navigate("/userLogin");                                                         
  };
  return (
 
    <div className='w-full  rounded-3xl mb-2 flex-row items-center bg-gradient-to-b from-pink-600  to-blue-700 hover:from-blue-700 hover:to-pink-600 shadow-lg shadow-gray-200   p-4'>
        <h2>Navigation</h2>
          <a  href="/" className="flex items-center gap-2 py-3">
            <RiHomeLine className="  w-8 h-8" />
            HOME
            </a>
          <a  href="/" className="flex items-center gap-2 py-3">
            <CgProfile className="w-8 h-8"/>
            PROFILE
            </a>
          <a  href="/" className="flex items-center gap-2 py-3">
            <RiChatSmile3Line className="w-8 h-8"/>
            CHATS
            </a>
          <a  href="/" className="flex items-center gap-2 py-3">
            <MdNotificationsNone className="w-8 h-8"/>
            NOTIFICATION
            </a>
          <a  href="/" className="flex items-center gap-2 py-3">
            <CgMoreR className="w-8 h-8"/>
            MORE
            </a>
          <button onClick={logout} className="flex items-center gap-2 py-3">
            <BiLogOutCircle className="w-8 h-8"/>
            LOGOUT
            </button>
    </div>

  
  )
}

export default Navigation
