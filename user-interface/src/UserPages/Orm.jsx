// import React, { useEffect, useState, useRef } from 'react';
// import axios from "axios";

// function Orm() {
//   const [posts, setPost] = useState([]);
//   const isMounted = useRef(true);

//   const [posts2, setPost2] = useState([]);
//   useEffect(() => {

//    const fetchPost =async()=>{

//     const data =await  axios.get("http://localhost:8800/api/users/getposts")
//     console.log("Data from API:", data);
//     console.log("Posts from API:", data.data.posts);
//     setPost(data.data.posts);
//     setPost2(posts)
//     if (isMounted.current) {
//       setPost(data.data.posts);
//     }

  
//    }   

//    fetchPost()

//    return () => {
//      console.log("return");
//      isMounted.current = false;
//    };

//   }, []);

//   useEffect(() => {
//     setPost(posts2);
//     console.log("Posts updated:",posts);
//   }, [posts]);
// console.log("posts");

//   return (
//     <div>
//      asdfghjkl
//     </div>
//   );
// }

// export default Orm;

















// import axios from 'axios'
// import React, { useEffect, useState } from 'react'




// function Orm() {
//   let id=null;
//   const [bool,setid]=useState(null)
//   const [customer,setcustomer]=useState(null)

// if(bool){
//   id="63b9b69d80782bb7f7faaaa9"
// }else{
//   id="641861d94e7b93656374ffa8"
// }
//   useEffect(()=>{
//     const   fetchuser =async()=> {
//       const user=await axios.post("http://localhost:8800/api/users/getuser",{userId:id})
     
//       setcustomer(user.data._id)
//       console.log(customer);
//     }
//     fetchuser()
//   },[])
//   return (
//     <div className='cursor-pointer	' onClick={()=>{
//       console.log("onclick");
//       setid(!bool)
//       }}>
//       user
//     </div>
//   )
// }

// export default Orm









import React from 'react'

function Orm() {
  return (
    <div>
<div className='grid grid-cols-20 fixed'>
<div className='col-span-12 bg-pink-200 w-full h-48'>
  firstdddd
</div>
</div>
    </div>
  )
}

export default Orm
