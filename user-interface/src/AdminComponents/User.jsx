import axios from 'axios'
import React, { useState } from 'react'

function User({user}) {

  
    const [block,setBlock] =useState(user?.block)

    const ManageBlock=async()=>{
        setBlock(!block)

        try {
            const res=await  axios.put(`http://localhost:8800/api/admin/userblockunblock/`+user?._id)
        } catch (error) {
            console.log(error);
        }

    }
    console.log(user);

  return (
    <div>
        <div className=' w-full flex border '> 
             <div style={{width:"5%"}} className='bg-blue-300 break-all overflow-hidden p-1   border-black '>{user.slno}</div>
        <div style={{width:"20%"}} className='bg-blue-400 break-all overflow-hidden p-1'>{user.mobile}</div>
        <div style={{width:"25%"}} className='bg-blue-300 break-all overflow-hidden p-1'>{user.username}</div>
        <div style={{width:"40%"}} className='bg-blue-400 break-all overflow-hidden p-1'>{user.email}</div>
        <div style={{width:"10%"}} className='bg-blue-300 break-all overflow-hidden p-1'>
          {block?  
            <div  className='font-bold text-white cursor-default'
             onClick={ManageBlock}
            >Unblock</div>:
            <div className='font-bold text-red-700	cursor-default'
            onClick={ManageBlock}
            >Block</div>
            }
        </div>
        </div>
    </div>
  )
}

export default User
