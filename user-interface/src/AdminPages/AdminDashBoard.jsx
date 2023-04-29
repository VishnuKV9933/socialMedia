import React ,{useEffect, useState} from 'react'
import SideBar from '../AdminComponents/SideBar'
import axios from 'axios'
import Barchart from '../AdminComponents/Barchart';
import Linechart from '../AdminComponents/Linechart';
import { baseUrl } from '../Utility/utility';
function AdminDashBoard() {

  const [count,setCount]=useState('')
  useEffect(()=>{
      
    const getPostReport=async()=>{
      const res=await axios.get(`${baseUrl}/admin/userperweek`)

 
      setCount(res.data.count)
     
     }

     getPostReport()
 
   },[])

  return (
    <div className="grid  grid-cols-20  h-screen" >

    <div className="col-span-4 h-full ">

    <SideBar/>
    </div>
    <div className="col-span-12 bg-blue-50 overflow-y-scroll">
    <div className="p-3 bg-blue-900 w-full bg-white rounded-lg text-white h- mt-1 flex 
    justify-center text-4xl font-bold font-serif">ADMIN DASHBOARD</div>
    <div className="mt-6">
            
            <div className='flex w-full justify-center items-center'>
                <div className='w-2/3 h-24 bg-white shadow-lg shadow-stone-300 rounded text-6xl	flex w-full justify-center items-center' >Total Users:{count} </div>
                {/* <div className='w-1/3 h-24 bg-red-200' >fdfds</div> */}
            </div>



        <div className='mt-16 w-full  flex flex-col justify-center items-center '>

        <Barchart />
        <Linechart />


        </div>

    </div>

    </div>
  </div>
  )
}

export default AdminDashBoard
