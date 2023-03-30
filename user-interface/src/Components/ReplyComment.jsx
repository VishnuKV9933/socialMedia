import React from 'react'

const ReplyComment = ({reply}) => {
  return (
    <div className="bg-slate-100 rounded-xl p-3 mt-2 text-sm">
          <div className='font-medium'>
            {reply.userName}
          </div>
        <div className="  text-sm">
         {reply.reply}
        </div>
    </div>
  )
}

export default ReplyComment
