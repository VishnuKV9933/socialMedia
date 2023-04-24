import axios from 'axios';
import React from 'react'

function ReportPost({setMore,setReportOpen,postId,postUser}) {
    const userId = JSON.parse(localStorage.getItem('userId'));

    const reporter=async(reason)=>{
        console.log(reason);

      const res=  await axios.post(`http://localhost:8800/api/admin/reportpost/`,{postId,userId,reason:reason,postUser})
        setMore(false)
        setReportOpen(false)
    }


  return (
    <>
     <div className='w-ful flex flex-col items-center bg-blue-200'>
      <div className='border-b mb-2 bg-blue-300 w-full flex justify-center font-bold'> Select Reason  </div>
      <div className='flex flex-col w-full '>

       <div onClick={()=>{reporter("Spam")}} className='mb-2 hover:bg-blue-400 w-full pl-2 text-sm font-semibold	 hover:font-bold cursor-default'>Spam</div>
       <div onClick={()=>{reporter("Nudity")}} className='mb-2 hover:bg-blue-400 w-full pl-2 text-sm font-semibold	 hover:font-bold cursor-default'>Nudity</div>
       <div onClick={()=>{reporter("Terrorism")}} className='mb-2 hover:bg-blue-400 w-full pl-2 text-sm font-semibold	 hover:font-bold cursor-default'>Terrorism</div>
       <div onClick={()=>{reporter("Hate speech")}} className='mb-2 hover:bg-blue-400 w-full pl-2 text-sm font-semibold	 hover:font-bold cursor-default'>Hate speech</div>
       <div onClick={()=>{reporter("Somethig else")}} className='mb-2 hover:bg-blue-400 w-full pl-2 text-sm font-semibold	 hover:font-bold cursor-default'>Somethig else</div>
      </div>
     </div>

    </>
  )
}

export default ReportPost
