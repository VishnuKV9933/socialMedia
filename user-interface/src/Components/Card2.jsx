import React from 'react'

function Card2({children}) {
  return (
    <div className='bg-gradient-to-b from-pink-400  to-pink-50  rounded w-full mb-2 flex-row items-center shadow-lg shadow-gray-200 p-4'>
      {children}
    </div>
  )
}

export default Card2
