import React  from 'react'

function RoundedCard({children}) {
  return (
    <div className=" w-full  bg-gradient-to-b from-pink-200  to-blue-200 hover:from-blue-200 hover:to-pink-200 rounded-3xl mb-2 flex-row items-center  shadow-lg shadow-gray-200    p-4">
     {children}
    </div>
  )
}

export default RoundedCard
