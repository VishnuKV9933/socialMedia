//  
import {useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { ToastContainer,toast } from 'react-toastify'
import axios from "axios"
import { baseUrl } from '../Utility/utility';

const AdminLogin = () => {
  console.log("user login react");
  const navigate=useNavigate()
 const generateError =(err) =>{
  console.log("tost");
  toast.error(err,{
    position:"top-right"
  })
}
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async (datas) => {
    console.log("addddddddddddddddddddd");
    try {
      const  { data }  = await axios.post(
        `${baseUrl}/auth/adminlogin`,
        { ...datas },
        {
          withCredentials: true,
        }
      );
console.log("datassssssssssssssssssss");
console.log(data);
      if(data){
        console.log("------------------data1--------------");
        if(data.errors){ 
          console.log("------------------data2--------------");
          console.log(data.errors);
          console.log("------------------data3--------------");
          const {email,password} =data.errors;
          if(email){ 
            console.log("------------------data4--------------");
             generateError(email) }
             
          else if(password) {
            console.log("------------------data5--------------");
            generateError(password)
          }
        }else{ 
          console.log("------------------data6--------------");
           navigate("/adminhome")
        }
      }
    } catch (err) {
      console.log("------------------data--------------");
      console.log(err);
      console.log("data");
    }
    };
  return (
    <div>
        <div class="bg-gradient-to-tr from-fuchsia-500 to-sky-300">
  <section id="login" class="p-4 flex flex-col justify-center min-h-screen max-w-md mx-auto">
    <div class="p-6 bg-sky-50 rounded">
      <div class="flex items-center justify-center font-black m-3 mb-12">
        

      <h1 class="tracking-wide text-3xl text-gray-900">Admin Login</h1>
      </div>
        <form  onSubmit={handleSubmit(onSubmit)}

        class="flex flex-col justify-center">
      
   <label class="text-sm font-medium">Email</label>
          <input class="mb-3 px-2 py-1.5
          mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none
          focus:border-sky-500
          focus:ring-1
          focus:ring-sky-500
          focus:invalid:border-red-500 focus:invalid:ring-red-500" type="text" name="email" placeholder="Enter  email" 
          {...register("email", {
            required: true,
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
          })}
          />
            {errors.email && errors.email.type === "required" && (
            <p style={{color:"red"}}>Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p style={{color:"red"}}>Email is not valid.</p>
          )}


<label class="text-sm font-medium">Password</label>
          <input class="mb-3 px-2 py-1.5
          mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none
          focus:border-sky-500
          focus:ring-1
          focus:ring-sky-500
          focus:invalid:border-red-500 focus:invalid:ring-red-500" type="password" name="password" placeholder="Enter password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password should be at-least  characters."
            }
          })}
      />
      {errors.password && (
    <p style={{color:"red"}}>{errors.password.message}</p>
  )}
          <button class="mt-6 px-4 py-1.5 rounded-md shadow-lg bg-gradient-to-r from-pink-600 to-red-600 font-medium text-gray-100 block transition duration-300" type="submit">
           
            <span id="login_default_state">Login<span id="subtotal"></span></span>
          </button>
        </form>
        <ToastContainer />


    </div>
  </section>

 
</div>
    </div>
  )
}

export default AdminLogin

