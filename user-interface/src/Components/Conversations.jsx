import React, { useEffect, useState } from 'react'
import { defaultProfilePicUrl,baseUrl}from '../Utility/utility'
import axios from 'axios'
function Conversations({conversation,currentUser, setCurrentChatFriend}) {


    const [user,setUser]=useState(null)
    const [profilCardUrl,setProfilCardUrl]=useState(defaultProfilePicUrl)
    useEffect(()=>{
        const friendId =conversation?.members?.find((m)=>(m!==currentUser?._id))
        const getUser = async () => {
        const res = await axios.post(`${baseUrl}/users/getuser`, {
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
        <div className='flex items-center bg-red border 
         h-16 rounded-md mb-3 font-bold text-cyan-800 hover:text-blue-300'>
            <img className='w-12 h-12 rounded-full ml-2 mr-6 ' src={profilCardUrl} alt="" />
            {user?.username}
            </div>
    </div>
    </>
  )
}

export default Conversations
