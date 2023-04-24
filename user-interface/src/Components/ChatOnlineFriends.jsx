import React, { useEffect, useState } from 'react'

import { defaultProfilePicUrl } from '../Utility/utility'



function ChatOnlineFriends({user}) {
    const [imageUrl,setImageUrl]= useState(defaultProfilePicUrl)


    useEffect(()=>{
        if(!user.profilePicture){
            setImageUrl(defaultProfilePicUrl)
        }else{
            setImageUrl(user.profilePicture)
        }
    })
  return (
    <div>
      <img className='w-12 h-12 rounded-full' src={ imageUrl} alt="img" />
    </div>
  )
}

export default ChatOnlineFriends
