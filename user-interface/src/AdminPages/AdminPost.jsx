import React from 'react'
import SideBar from '../AdminComponents/SideBar'
import PostManagement from '../AdminComponents/PostManagement'
function AdminPost() {
  return (
    <div className="grid  grid-cols-20" >

    <div className="col-span-4 h-full ">

    <SideBar/>
    </div>
    <div className="col-span-12 bg-blue-50 h-screen">
    <div className="p-3 bg-blue-900 w-full bg-white rounded-lg text-white h- mt-1 flex 
    justify-center text-4xl font-bold font-serif">POST MANAGEMENT</div>
    <div className='mt-6'>
      <PostManagement/>
    </div>

    </div>
  </div>
  )
}

export default AdminPost
