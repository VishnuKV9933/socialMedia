import React from 'react'

function Card({children}) {
  return (
    <div className='rounded w-full mb-2 flex-row items-center bg-white shadow-lg shadow-gray-200 p-4'>
      {children}
    </div>
  )
}
export default Card
