import axios from 'axios'
import React, { useEffect, useState } from 'react'

import NotificationCard from '../Components/NotificationCard';
import { baseUrl } from '../Utility/utility';

function Notification() {
    const userId = JSON.parse(localStorage.getItem('userId'));

    const [notification,setNotification] = useState([])
    

    useEffect(()=>{
      getNotification()
    },[])

    const getNotification=async()=>{

       const res=await axios.get(`${baseUrl}/notification/getnotification/${userId}`)

       setNotification(res.data)
    
      
    }

   

  return (
    <div className='bg-blue-100 w-ful h-screen overflow-hidden border-8 p-6 overflow-y-scroll'>
        <div className='font-bold text-2xl text-cyan-700 font-serif mb-10'>Notifications</div>

        {
            notification.map((elem)=>{
             
                return <>
                <NotificationCard key={elem._id} notice={elem}/>
                    
                   
                </>
            })
        }

    </div>
  )
}

export default Notification
