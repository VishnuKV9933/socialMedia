import React, { useEffect, useState } from 'react'
import { defaultProfilePicUrl}from '../Utility/utility'
import axios from 'axios'
function Conversations({conversation,currentUser, setCurrentChatFriend}) {


    const [user,setUser]=useState(null)
    const [profilCardUrl,setProfilCardUrl]=useState(defaultProfilePicUrl)
    useEffect(()=>{
        const friendId =conversation?.members?.find((m)=>(m!==currentUser?._id))
        const getUser = async () => {
        const res = await axios.post("http://localhost:8800/api/users/getuser", {
          userId: friendId,
        });
        setUser(res.data)
        if(res.data.profilePicture) setProfilCardUrl(res.data.profilePicture)

        setCurrentChatFriend(res.data)   

        }
        getUser()
    },[currentUser,conversation])
  return (
    <>
    <div className='w-full  '>
        <div className='flex items-center bg-red border bg-gradient-to-r hover:bg-gradient-to-r from-blue-400   to-blue-700 hover:from-blue-700 hover:to-pink-600
         h-16 rounded-md mb-3 font-bold text-cyan-800 hover:text-white'>
            <img className='w-12 h-12 rounded-full ml-2 mr-6 ' src={profilCardUrl} alt="" />
            {user?.username}
            </div>
    </div>
    </>
  )
}

export default Conversations
