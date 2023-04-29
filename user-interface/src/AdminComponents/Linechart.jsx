
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { baseUrl } from '../Utility/utility';
function Linechart() {

    const [postDate,setPostDate]=useState('')
    const [daily,setDaily]=useState(true)
    
    const data=postDate
    
    const changeToMonthly=async()=>{
        const res=await axios.get(`${baseUrl}/admin/userperweek`)
        setPostDate(res.data.monthly)
        setDaily(false)
    }  
    const changeToDaily=async()=>{
        const res=await axios.get(`${baseUrl}/admin/userperweek`)
        setPostDate(res.data.daily)
        setDaily(true)
    }
          useEffect(()=>{
      
            const getPostReport=async()=>{
              const res=await axios.get(`${baseUrl}/admin/userperweek`)
              setPostDate(res.data.daily)
             
             }
    
             getPostReport()
         
           },[])
         



    return (
        <div className='w-fit flex flex-col justify-center items center bg-white '>
            {/* <ResponsiveContainer width="100%" height={200}> */}
    
            <div className='w-full flex justify-center text-3xl	text-lime-700 font-medium'>User Chart</div>
            <div className='ml-1 text-sm p-1'>
    {daily?<div onClick={changeToDaily} className='mb-2 font-bold  cursor-pointer'>
        Daily
    </div>:
    <div onClick={changeToDaily} className='mb-2 font-medium text-zinc-500 cursor-pointer'>
        Daily
    </div>}
    
    {daily?<div onClick={changeToMonthly} className='mb-2 font-medium text-zinc-500 cursor-pointer'>
        Monthly
    </div>:
    <div onClick={changeToMonthly} className='mb-2 font-bold  cursor-pointer' >
    Monthly
    </div>}
            </div>
          <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="new_user" stroke="#8884d8" activeDot={{ r: 8 }} />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
    
            {/* </ResponsiveContainer> */}
    
    
        </div>
      )
}

export default Linechart

