import React, { useEffect, useRef, useState } from 'react'
import {RiHomeLine,RiChatSmile3Line} from "react-icons/ri"
import {CgProfile,CgMoreR} from "react-icons/cg"
import {MdNotificationsNone} from "react-icons/md"
import {BiLogOutCircle} from "react-icons/bi"
import { useCookies } from "react-cookie";
import {useNavigate, NavLink} from "react-router-dom"

// import {io} from 'socket.io-client'

function Navigation() {
  const socket =useRef()

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [count, setCount] = useState('');
  const logout =() => {
    removeCookie("jwt");
    navigate("/userLogin");
    // eslint-disable-next-line no-restricted-globals
    localStorage.removeItem("userId"); 

  };


  // useEffect(()=>{
  //   socket.current=io('ws://localhost:8900')
  // },[])

  
//   useEffect(()=>{

  
//     socket.current.on('toall',(data)=>{

//     })
//     socket.current.on('getNotice',(data)=>{
//      setCount(data)

//     })

// },[])
  return (
    // <div className='w-full transition-all bg-gradient-to-b from-pink-200  to-blue-200 hover:from-blue-200 hover:to-pink-200 rounded-3xl mb-2 flex-row items-center  shadow-lg shadow-gray-200    p-4'>
    <div className='w-full transition-all bg-blue-200 text-sky-900	 rounded-3xl mb-2 flex-row items-center  shadow-lg shadow-gray-200    p-4'>

        <h2>Navigation</h2>
<div className='' >

          <NavLink  to='/' className="font-extrabold flex items-center transition-all  hover:rounded-full hover:ml-6   gap-2 py-3">
            <RiHomeLine className="  w-8 h-8 font-bold" />
            HOME
            </NavLink>
</div>

          <button onClick={() => navigate('/profile')}  className="font-extrabold flex items-center transition-all hover:rounded-full  hover:ml-6  gap-2 py-3">
            <CgProfile className="w-8 h-8"/>
            PROFILE
            </button>
          <NavLink  to="/chat" className="font-extrabold flex items-center transition-all hover:rounded-full  hover:ml-6  gap-2 py-3">
            <RiChatSmile3Line className="w-8 h-8"/>
            CHATS
            </NavLink>

          <NavLink  to="/notification" className="font-extrabold flex items-center transition-all  hover:rounded-full  hover:ml-6  gap-2 py-3">
            <MdNotificationsNone className="w-8 h-8"/>
            NOTICE!<>{count}</>
            </NavLink>

          <button onClick={logout} className="font-extrabold flex items-center transition-all hover:rounded-full  hover:ml-6  gap-2 py-3">
            <BiLogOutCircle className="w-8 h-8"/>
            LOGOUT
            </button>
    </div>

  
  )
}

export default Navigation
