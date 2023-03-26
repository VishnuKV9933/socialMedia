import React from 'react'

function ProfileCard() {
  return (
    <div className=" w-full  bg-gradient-to-b from-pink-200  to-blue-200 hover:from-blue-200 hover:to-pink-200 rounded-3xl mb-2 flex-row items-center  shadow-lg shadow-gray-200    p-4">
      <div>
          <div className="w-12 rounded-full overflow-hidden">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6tYl-IikcR09ow-_H9yFcUpQgV7aWYTobF5-qERbl2yJmM458f_EBJy0&s"
              alt="img"
            />
          </div>
        </div>
    </div>
  )
}

export default ProfileCard
