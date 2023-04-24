import axios from 'axios'
import React, { useEffect, useState } from 'react'

import NotificationCard from '../Components/NotificationCard';

function Notification() {
    const userId = JSON.parse(localStorage.getItem('userId'));

    const [notification,setNotification] = useState([])
    

    useEffect(()=>{
      getNotification()
    },[])

    const getNotification=async()=>{

       const res=await axios.get(`http://localhost:8800/api/notification/getnotification/${userId}`)

       setNotification(res.data)
    
    console.log("res.data");
      
    }

   

  return (
    <div className='bg-blue-100 w-ful h-screen overflow-hidden border-8 p-6 '>
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
