import axios from 'axios'
import React, { useState } from 'react'
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';
import { baseUrl } from '../Utility/utility'; 
import { useNavigate } from 'react-router-dom';
timeago.register('vi', vi);
function NotificationCard({notice}) {
  const navigate=useNavigate()
    const [read ,setRead] = useState(notice?.readed)
    const readNotice=async(id)=>{
      
        const res=await  axios.patch(`${baseUrl}/notification/read/${id}`)
        }

    const notsean='w-full h-12 rounded bg-blue-300 flex items-center gap-2 mt-4 ' 
    const seaned='w-full h-12 rounded bg-blue-200 flex items-center gap-2 mt-4 ' 
  return (
    
    <div className=''>
       <div  onClick={()=>{
        readNotice(notice._id)
        setRead(true)
    }}
                      className={read?seaned:notsean}>
                    <div onClick={() => navigate(`/peopleprofile/${notice?.senderId}`)} className='font-bold ml-10 cursor-pointer'>{notice.senderName} </div><div className='w-72 overflow-hidden'>{notice.message}</div>
                    <div> <TimeAgo datetime={notice?.createdAt} locale='en'/></div>
                </div>
    </div>
  )
}

export default NotificationCard
