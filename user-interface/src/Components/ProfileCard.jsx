import React from 'react'

function ProfileCard({name,url}) {

  return (
    <div className=" w-full  bg-gradient-to-b from-pink-200  to-blue-200 hover:from-blue-200 hover:to-pink-200 rounded-3xl mb-2 flex-row items-center  shadow-lg shadow-gray-200    p-4">
      <div className='flex jsutifu-center items-center'>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img className='w-14 h-14'
              src={url}
              alt="img"
            />
          </div>

          <div className='text-lg ml-3 font-bold font-serif hover:font-black hover:text-xl transition-all'>{name}</div>
        </div>
    </div>
  )
}

export default ProfileCard
