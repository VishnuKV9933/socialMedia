import React, { useEffect, useState } from 'react'
import Modal from '../Components/Modal'
import axios from 'axios'
import { baseUrl } from '../Utility/utility';
import ReportPostCard from './ReportPostCard'
function ReportedPost({report,getReportedPost}) {

    const [reasonOpen ,setReasonOpen]=useState(false)
    const [postOpen ,setPostOpen]=useState(false)
    const [post ,setPost]=useState({})
   


    const getPost=async()=>{

     const res=await   axios.get(`${baseUrl}/admin/getpost/${report?.postId}`)

        setPost(res.data)
    }
    useEffect(()=>{
        getPost()
    },[])

    const hidePost=async ()=>{
      const res=await   axios.put(`${baseUrl}/admin/hidepost/${report?.postId}`)

      console.log("res.data",res.data);
      getReportedPost()
    }

  return (
    <div>

<Modal 
         onClose={() => { 
          
            setPostOpen(false)
          }}
        open={postOpen} >

            <ReportPostCard post={post}/>

           
       </Modal>

       <Modal 
         onClose={() => { 
          
            setReasonOpen(false)
          }}
        open={reasonOpen} >

           
         <div className='w-full font-bold text-lg flex justify-center items-center'>Reasons</div>
            <div className='w-48 h-48 bg-blue-300 p-4 '>
            {report?.reportDeteils.map((elem)=>{
                return <>
                <div className='font-semibold text-md'>

                <div>{elem.reason}</div>
                </div>
                </>
            })}
            </div> 
          
       </Modal>

        <div className='w-full bg-blue-200 mt-3 h-16 rounded-lg border p-1 flex  justify-center items-center   '>

<div className='flex justify-center items-center  w-full'>
            <div style={{width:"30%"}} className='flex gap-2 font-bold' >Post Owner:
            <div className='text-sm flex justify-center items-center font-medium'> {report.postOwner} </div>
            </div>

            <div style={{width:"25%"}} className='flex gap-2 font-bold' >Report Count:
            <div className='text-sm flex justify-center items-center font-medium'> {report?.reportDeteils.length} </div>
            </div>

    <div onClick={()=>{setReasonOpen(true)}}
     style={{width:"20%"}}><div className='bg-blue-400 text-white cursor-default w-fit p-1 rounded-md  hover:font-medium  '>View Reasons</div></div>
    <div onClick={()=>{setPostOpen(true)}} style={{width:"15%"}}><div className='bg-blue-400 text-white cursor-default w-fit p-1 rounded-md  hover:font-medium  '>View Post</div></div>
    <div onClick={hidePost}  style={{width:"15%"}}><div className='bg-blue-400 text-white cursor-default w-fit p-1 rounded-md  hover:font-medium  '>Hide Post</div> </div>
</div>


     {/* ReportCount{report?.reportDeteils.length} */}
        </div>
    </div>
  )
}

export default ReportedPost
