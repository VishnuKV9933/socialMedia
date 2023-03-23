import React from 'react'

function Like({Like}) {

  return (
    <div className='flex gap-2'>
        <div className='ml-1'>
         {Like}
        </div>
        <div>Likes</div>
    </div>  
  )
}

export default Like
