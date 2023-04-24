import axios from 'axios'
import React, { useState } from 'react'
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';
timeago.register('vi', vi);
function NotificationCard({notice}) {
    const [read ,setRead] = useState(notice?.readed)
    const readNotice=async(id)=>{
      
        const res=await  axios.patch(`http://localhost:8800/api/notification/read/${id}`)
        }

    const notsean='w-full h-12 rounded bg-blue-300 flex items-center gap-2 mt-4 ' 
    const seaned='w-full h-12 rounded bg-blue-200 flex items-center gap-2 mt-4 ' 
  return (
    
    <div>
       <div onClick={()=>{
        readNotice(notice._id)
        setRead(true)
    }}
                      className={read?seaned:notsean}>
                    <span className='font-bold ml-10 '>{notice.senderName} </span><span>{notice.message}</span>
                    <span> <TimeAgo datetime={notice?.createdAt} locale='en'/></span>
                </div>
    </div>
  )
}

export default NotificationCard
