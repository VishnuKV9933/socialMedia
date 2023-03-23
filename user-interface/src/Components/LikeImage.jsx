import React from 'react';

function LikeButton({isliked}) {
  return (

    <div>
   {isliked ?
<div class="w-6 h-6">
  <svg viewBox="0 0 20 20" class="w-full h-full">
    <path fill-rule="evenodd" d="M10 17.583l8.267-8.708C19.787 7.81 20 6.944 20 6c0-3.308-2.692-6-6-6-2.08 0-3.948 1.064-5.033 2.67C7.948 1.064 6.08 0 4 0 1.792 0 0 1.792 0 4c0 .944.213 1.81.733 2.875L9.267 17.583z" class="fill-current text-pink-600"/>
  </svg>
</div>:

<div className="w-6 h-6">
  <svg viewBox="0 0 20 20" fill="gray" className="w-full h-full">
    <path fill-rule="evenodd" d="M10 17.583l8.267-8.708C19.787 7.81 20 6.944 20 6c0-3.308-2.692-6-6-6-2.08 0-3.948 1.064-5.033 2.67C7.948 1.064 6.08 0 4 0 1.792 0 0 1.792 0 4c0 .944.213 1.81.733 2.875L9.267 17.583z"/>
  </svg>
</div>
}
    </div>
    // <button
     
    //   className={`bg-gray-200 hover:bg-gray-300 rounded-full p-2 ${
    //     isliked ? 'text-red-500' : 'text-gray-500'
    //   }`}
    // >
    //   {isliked ? 'Unlike' : 'Like'}
    //   {isliked}
    // </button>
  );
}

export default LikeButton;