import React, { useEffect, useState } from 'react'

import { defaultProfilePicUrl ,baseUrl} from '../Utility/utility'
import axios from 'axios'
import ChatOnlineFriends from './ChatOnlineFriends'

function ChatOnline({onlineUsers, currentId, setCurrentChat ,user,setCurrentChatFriend}) {

    const [friends,setFriends]=useState([])
    const [onlineFriends,setOnlineFriends]=useState([])

    const handleClick=async(user)=>{

      try {
        const res =await axios.get(`${baseUrl}/conversation/${currentId}/twouser/${user._id}`)
        setCurrentChat(res.data)
    } catch (error) {
      
    }}

    useEffect(()=>{
        const getFriends = async()=>{
          const res=  await axios.get(`${baseUrl}/users/getfriends/`+currentId)
          setFriends(res.data)
        }
        getFriends();
    },[currentId])

    useEffect(()=>{
        setOnlineFriends(friends.filter((f)=>onlineUsers.includes(f._id)))
    },[friends,onlineUsers])
  return (
    <>
        {onlineFriends.length<=0?
        <div className='text-2xl'>No one is online</div>:<></>
        }
    {onlineFriends?.map((elem)=>{
        return <div key={elem?._id}>

    <div onClick={()=>{
      handleClick(elem)
      const getUser = async () => {
          const res = await axios.post(`${baseUrl}/users/getuser`, {
            userId: elem._id,
          }
          )
          setCurrentChatFriend(res.data)
          }
          getUser()
     
    }} className='flex items-center w-full border p-2 rounded-md gap-6 
     bg-gradient-to-r hover:bg-gradient-to-r from-blue-400 
       to-blue-700 hover:from-blue-700 hover:to-pink-600 font-bold text-cyan-800 hover:text-white'>
      <ChatOnlineFriends user={elem}/>
{/* <img className='w-12 h-12 rounded-full' src={elem?.profilePicture?elem?.profilePicture : defaultProfilePicUrl} alt="img" /> */}

<div>{elem.username}</div>

    </div>
        </div>

    })}

    </>
  )
}

export default ChatOnline
