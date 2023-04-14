import React,{useState} from 'react'
import { defaultProfilePicUrl } from "../Utility/utility";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Suggestion({suggestion,user,suggestionFunction}) {


  const userId = JSON.parse(localStorage.getItem("userId"));

  const [followState,setFollowState]=useState(user?.following?.includes(suggestion._id))

   const navigate=useNavigate()

  const follow=()=>{
  try {
    axios.patch(`http://localhost:8800/api/users/follow/${userId}/${suggestion?._id}`).then((res)=>{
      setFollowState(!followState)
      suggestionFunction()
    })
  } catch (error) {
    console.log(error);
  }
  }

  
  const unFollow=()=>{
    try {
     
      axios.patch(`http://localhost:8800/api/users/unfollow/${userId}/${suggestion?._id}`).then((res)=>{
      
        setFollowState(!followState)
        suggestionFunction()
      })
     

    } catch (error) { 
      console.log(error);
    }
    }



  return (
    <div className="w-full h-24 bg-slate-200 rounded-xl z-40 p-1 mt-1">
 <div  className='w-full h-full bg-white rounded-xl flex '>

<div  className='w-1/3 bg-white rounded-l-xl flex justify-center border-r-4

items-center'>




<div className='w-20 h-20 border-4 	rounded-full flex justify-center items-center overflow-hidden'>
 

  <img  onClick={() => navigate(`/peopleprofile/${suggestion?._id}`)}
   className='w-24 h-24' src={suggestion?.profilePicture?suggestion?.profilePicture: defaultProfilePicUrl} alt="img" />
 
</div>

  
  </div>
<div className='w-2/3 flex flex-col justify-center gap-2 items-center bg-blue-200'>
  
  <div className='font-semibold italic text-xl text-white' >{suggestion.username}</div>
  <div>

  </div>
{
  !followState?
   <button className='italic hover:shadow-cyan-500/50 hover:bg-blue-400 hover:shadow-white hover:shadow-2xl	 px-1 rounded text-white font-semibold' onClick={()=>{follow()}} >follow</button>
   :
   <button className='italic hover:shadow-cyan-500/50 hover:bg-blue-400 hover:shadow-white hover:shadow-2xl	 px-1 rounded text-white font-semibold' onClick={()=>{unFollow()}} >unfollow</button>
}

</div>

 </div>
</div>
  )
}

export default Suggestion
