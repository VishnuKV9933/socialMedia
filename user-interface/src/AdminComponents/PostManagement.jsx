import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReportedPost from './ReportedPost'
import { baseUrl } from '../Utility/utility';

function PostManagement() {

    const [reportedPost ,setReportedPost]=useState([])

    const getReportedPost=async()=>{
        const res=   await axios.get(`${baseUrl}/admin/getreportedposts`)
        setReportedPost(res.data)
    }
    useEffect(()=>{
        getReportedPost()
    },[])


  return (
    <div>
<div className='w-full h-12 text-2xl mt-6'>REPORTED POSTS</div> 

{
    reportedPost?.map((elem)=>{
        return <>
        <ReportedPost key={elem._id} report={elem} getReportedPost={getReportedPost}/>
        </>

    })
}


   </div>
  )
}

export default PostManagement
