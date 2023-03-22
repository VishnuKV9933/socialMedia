// import React, { useState } from "react";
// import { Link,useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "./UserSignup.css";
// import axios from "axios";
// import { useForm } from 'react-hook-form';



// const UserSignup = () => {
//   const navigate=useNavigate()
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });    
// const generateError =(err) =>{
  
//   toast.error(err,{
//     position:"top-right"
//   })
// }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:8800/api/auth/usersignup",
//         { ...values },
//         {
//           withCredentials: true,
//         }
//       );
//       console.log("................1...................");
//       if(data){
//         console.log("................2...................");
//         if(data.errors){ 
//           console.log("................3...................");
//           const {email,password} =data.errors;
//           console.log("................4...................");
//           if(email) {
//             console.log("................5...................");
//             generateError(email)
//           }
//           else if(password){
//             console.log("................6...................");
//             generateError(password)
//           }else{
//             console.log("................7...................");

//           }
//           console.log("................8...................");
//         }
//         console.log("/navigater");
//         // navigate("/")
//         console.log("................9...................");

//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }; 

//   return (
//     <div>
//       <div class="bg-gradient-to-tr from-fuchsia-500 to-sky-300">
//         <section
//           id="login"
//           class="p-4 flex flex-col justify-center min-h-screen max-w-md mx-auto"
//         >
//           <div class="p-6 bg-sky-50 rounded">
//             <div class="flex items-center justify-center font-black m-3 mb-12">
//               <h1 class="tracking-wide text-3xl text-gray-900">Cinima app</h1>
//             </div>

//             <form
//               onSubmit={(e) => handleSubmit(e)}
//               class="flex flex-col justify-center"
//             >
//               <label class="text-sm font-medium">Name</label>
//               <input
//                 class="mb-3 px-2 py-1.5
//           mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
//           focus:outline-none
//           focus:border-sky-500
//           focus:ring-1
//           focus:ring-sky-500
//           focus:invalid:border-red-500 focus:invalid:ring-red-500"
//                 type="text"
//                 name="name"
//                 placeholder="Enter name"
//                 onChange={(e) =>
//                   setValues({ ...values, [e.target.name]: e.target.value })
//                 }
//               />

//               <label class="text-sm font-medium">Email</label>
//               <input
//                 class="mb-3 px-2 py-1.5
//           mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
//           focus:outline-none
//           focus:border-sky-500
//           focus:ring-1
//           focus:ring-sky-500
//           focus:invalid:border-red-500 focus:invalid:ring-red-500"
//                 type="text"
//                 name="email"
//                 placeholder="Enter  email"
//                 onChange={(e) =>
//                   setValues({ ...values, [e.target.name]: e.target.value })
//                 }
//               />

//               <label class="text-sm font-medium">Mobile Number</label>
//               <input
//                 class="mb-3 px-2 py-1.5
//           mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
//           focus:outline-none
//           focus:border-sky-500
//           focus:ring-1
//           focus:ring-sky-500
//           focus:invalid:border-red-500 focus:invalid:ring-red-500"
//                 type="text"
//                 name="mobile"
//                 placeholder="Enter  phone number"
//                 onChange={(e) =>
//                   setValues({ ...values, [e.target.name]: e.target.value })
//                 }
//               />

//               <label class="text-sm font-medium">Password</label>
//               <input
//                 class="mb-3 px-2 py-1.5
//           mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
//           focus:outline-none
//           focus:border-sky-500
//           focus:ring-1
//           focus:ring-sky-500
//           focus:invalid:border-red-500 focus:invalid:ring-red-500"
//                 type="password"
//                 name="password"
//                 placeholder="Enter password"
//                 onChange={(e) =>
//                   setValues({ ...values, [e.target.name]: e.target.value })
//                 }
//               />

//               <div class="block">
//                 <span class="ml-3">Select your field</span>

//                 <div class="mt-2">
//                   <label class="inline-flex items-center">
//                     <input
//                       type="checkbox"
//                       name="hai"
//                       class="w-6 h-3 rounded-full"
//                       onSelect={(e) =>
//                         setValues({
//                           ...values,
//                           [e.target.name]: e.target.value,
//                         })
//                       }
//                     />

//                     <span class="ml-3">Producer</span>
//                   </label>
//                 </div>

//                 <div class="mt-2">
//                   <label class="inline-flex items-center">
//                     <input
//                       type="checkbox"
//                       value={"Producer"}
//                       class="w-6 h-3 rounded-full"
//                     />

//                     <span class="ml-3">Actor</span>
//                   </label>
//                 </div>
//                 <div class="mt-2">
//                   <label class="inline-flex items-center">
//                     <input type="checkbox" class="w-6 h-3 rounded-full" />

//                     <span class="ml-3">Director</span>
//                   </label>
//                 </div>
//               </div>

//               <button
//                 class="mt-6 px-4 py-1.5 rounded-md shadow-lg bg-gradient-to-r from-pink-600 to-red-600 font-medium text-gray-100 block transition duration-300"
//                 type="submit"
//               >
//                 <span id="login_default_state">
//                   Donate<span id="subtotal"></span>
//                 </span>
//               </button>
//             </form>
//             <ToastContainer />

//             <div class="mt-6 text-grey-dark">
//               Already have an account?
//               <Link to={"/userLogin"}>
//                 <span style={{ color: "blue" }}>Login</span>
//               </Link>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default UserSignup;
