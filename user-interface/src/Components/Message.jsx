import React from 'react'
import {defaultProfilePicUrl} from "../Utility/utility"
import { format } from 'timeago.js';
function Message({message,own}) {
  return (

    <div className='relative'>

 
{!own?

(
    <div className=' w-5/6 break-all  rounded-md bg-blue-100 mt-3'>
     <div className='flex  '>
                <img className='w-8 h-8  rounded-full' src={defaultProfilePicUrl} alt="" />
                <div className='text-sm'>{message.text}
                          </div>
     </div>
     <div className='w-full  h-5'>

                          <div className='float-right text-sm'>{format(message.createdAt)}</div>
     </div>
    </div>)
:
// {/* ---------------------------own---------------------------------- */}
   (
    <div className='w-full flex mt-3 justify-end'>

    <div className='border w-5/6  h-fit w-full bg-red-300 break-all float-fight rounded-md bg-pink-100 '>

     <div  className='flex w-full '>
                <img className='w-8 h-8  rounded-full' src={defaultProfilePicUrl} alt="" />
                <div className='text-sm'>{message.text} 
                          </div>

     </div>
     <div className='w-full  h-5'>

                          <div className='float-right text-sm'>{format(message.createdAt)}</div>
     </div>
    </div>
    </div>
    
    )
// {/* ---------------------------own---------------------------------- */}

}


    </div>

  )
}

export default Message
