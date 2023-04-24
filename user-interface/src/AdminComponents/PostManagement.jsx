import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReportedPost from './ReportedPost'

function PostManagement() {

    const [reportedPost ,setReportedPost]=useState([])

    const getReportedPost=async()=>{
        const res=   await axios.get(`http://localhost:8800/api/admin/getreportedposts`)
        setReportedPost(res.data)
    }
    useEffect(()=>{
        getReportedPost()
    },[])

    console.log(reportedPost);

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
