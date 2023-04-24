import axios from 'axios'
import React, { useEffect, useState } from 'react'
import User from './User'


function UserMangement() {



    const [users,setUsers] =useState([])
   

    useEffect(()=>{
        getUsers()
    },[])

    const getUsers=async()=>{
        console.log("hai");
        const res=   await axios.get(`http://localhost:8800/api/admin/getuser`)
        console.log("res.data");
        let count=1
        for(const user of res.data){
            user.slno=count;
            count++;
        }
        setUsers(res.data)
       }

       console.log("users",users);

  return (
    <div>
    <div className=' w-full flex border'>
        <div style={{width:"5%"}} className='bg-blue-500 break-all overflow-hidden p-1  border-black '>sl.no</div>
        <div style={{width:"20%"}} className='bg-blue-500 break-all overflow-hidden p-1'>Mobile</div>
        <div style={{width:"25%"}} className='bg-blue-500 break-all overflow-hidden p-1'>Name</div>
        <div style={{width:"40%"}} className='bg-blue-500 break-all overflow-hidden p-1'>Email</div>
        <div style={{width:"10%"}} className='bg-blue-500 break-all overflow-hidden p-1'>Options</div>
    </div>

    <div style={{height:"300px"}} className=' overflow-y-scroll'>
{users.map((user)=>{

    return<>

         
            

            <User key={user._id} user={user}/>
            
        
   
    </>
})}
</div>

   
    </div>
  )
}

export default UserMangement
