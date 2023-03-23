// import React from 'react';

// const ShareButton = () => {
//   return (
//     <button className="share-button flex items-center justify-center relative w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full shadow cursor-pointer transition-colors">
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
//         <path fill="none" d="M0 0h24v24H0z"/>
//         <path d="M17.66 3c-1.25 0-2.38.5-3.19 1.31L8.5 9.25c0-.14-.06-.26-.07-.4L7 8.5a4.74 4.74 0 1 0 0 7h3v-2H7a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 2.75 2.75v.25l5.5-3.17c.02-.13.07-.24.07-.38a3.08 3.08 0 0 0-3.07-3.07zm-5.32 12c1.25 0 2.38-.5 3.19-1.31l5.47-5.47c0 .14.06.26.07.4l1.5 1.25a4.74 4.74 0 1 0 0-7h-3v2h3a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 2.75 2.75v.25l5.5-3.17c.02-.13.07-.24.07-.38a3.08 3.08 0 0 0-3.07-3.07z"/>
//       </svg>
//       <div className="absolute w-full h-full rounded-full bg-black opacity-10 z-0 transition-opacity duration-300"></div>
//     </button>
//   );
// };

// export default ShareButton;
// import React from 'react';

// const ShareButton = () => {
//   return (
//     <button className="share-button flex items-center justify-center relative w-10 h-10 bg-white hover:bg-gray-200 rounded-md shadow-md cursor-pointer transition-colors">
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-6 h-6">
//         <path fill="currentColor" d="M7.49 14.77a.742.742 0 0 0 .96.305l5.51-2.69a.75.75 0 0 0 0-1.39l-5.51-2.69a.741.741 0 0 0-.96.305c-.24.42-.15.95.25 1.2l3.51 1.71-3.51 1.71a.76.76 0 0 0-.25 1.32zm4.51-12.54a2.506 2.506 0 0 1 2.5 2.5c0 .69-.28 1.32-.74 1.77l-1.74 1.74a.75.75 0 0 0 1.06 1.06l1.74-1.74a3.997 3.997 0 0 0 0-5.65l-1.74-1.74a.75.75 0 1 0-1.06 1.06l1.74 1.74c.46.45.74 1.08.74 1.77 0 .89-.61 1.63-1.44 1.84v2.31a.75.75 0 0 0-1.5 0v-2.31c-.83-.21-1.44-.95-1.44-1.84a2.506 2.506 0 0 1 2.5-2.5z"/>
//       </svg>
//     </button>
//   );
// };

// export default ShareButton;


// const ShareButton = () => {
//   return (
//     <button className="bg-white hover:bg-gray-200 rounded-full px-5 py-2 flex items-center gap-2 shadow-md transition-colors">
//       <img src="https://cdn3d.iconscout.com/3d/premium/preview/seo-share-6400978-5298204.png" alt="Share Icon" className="w-6 h-6" />
//       <span className="text-lg font-bold">Share</span>
//     </button>
//   );
// };

// export default ShareButton;


// import React from 'react';

// const ShareButton = () => {
//   return (
//     <button className="bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-md transition-colors hover:bg-gray-200">
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//       </svg>
//       <span className="text-lg font-bold">Share</span>
//     </button>
//   );
// };

// export default ShareButton;

import React from 'react';

const ShareButton = () => {
  return (
    <button className="bg-gradient-to-b from-blue-500 to-pink-700 hover:from-pink-600 hover:to-blue-600 focus:outline-none rounded-full py-2 px-6 text-white shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-1 hover:shadow-xl">
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        {/* <path fill="currentColor" d="M14 5l7 7m0 0l-7 7m7-7H3" /> */}
      </svg>
      <span className="font-medium text-5m">Share</span>
    </button>
  );
};

export default ShareButton;

