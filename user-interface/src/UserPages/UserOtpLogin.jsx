import React from 'react'
import { ToastContainer,toast } from 'react-toastify'
import { useForm } from "react-hook-form";
import {RecaptchaVerifier,  signInWithPhoneNumber } from "firebase/auth";

import axios from "axios"
import { auth } from '../firebaseConfig'
function UserOtpLogin() {

console.log(auth.currentUser);


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

            try {
                const phoneNumber="8921606978"
                const ph="+91"
                const cc=ph+phoneNumber
                
            const  { data }  = await axios.post(
                "http://localhost:8800/api/auth/otplogin",{ ...datas },{ withCredentials: true});
                        console.log(data);


                let recaptchaVerifier=await new RecaptchaVerifier("reqcapcha",{},auth)

                let confirmation=await signInWithPhoneNumber(auth,cc,recaptchaVerifier)
                console.log(confirmation);
                                
            } catch (error) {
                console.log(error);
                console.log("catch");
            }

        }
  return (
    <div>
       <div className="bg-gradient-to-tr from-fuchsia-500 to-sky-300">
  <section id="login" className="p-4 flex flex-col justify-center min-h-screen max-w-md mx-auto">
    <div className="p-6 bg-sky-50 rounded">
      <div className="flex items-center justify-center font-black m-3 mb-12">
        

      <h1 className="tracking-wide text-3xl text-gray-900">Cinima app</h1>
      </div>


        <form  onSubmit={handleSubmit(onSubmit)}

        className="flex flex-col justify-center">
      
   <label className="text-sm font-medium">Mobile Number</label>
          <input className="mb-3 px-2 py-1.5
          mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none
          focus:border-sky-500
          focus:ring-1
          focus:ring-sky-500
          focus:invalid:border-red-500 focus:invalid:ring-red-500" type="text" name="mobile" placeholder="Enter  mobile number" 
          {...register("mobile", {
            required: true,
            pattern:/^([+]\d{2})?\d{10}$/
          })}
          />
          
          {errors.mobile && errors.mobile.type === "required" && (
            <p style={{color:"red"}}>Mobile number is required.</p>
          )}
          {errors.mobile && errors.mobile.type === "pattern" && (
            <p style={{color:"red"}}>Mobile is not valid.</p>
          )}

          <button className="mt-6 px-4 py-1.5 rounded-md shadow-lg bg-gradient-to-r from-pink-600 to-red-600 font-medium text-gray-100 block transition duration-300" type="submit">
           
            <span id="login_default_state">Donate<span id="subtotal"></span></span>
          </button>
        </form>
        <ToastContainer />
             <div id='reqcapcha' >

             </div>
		<div className="mt-6 text-grey-dark">
                    Already have an account?
                   
                </div>
    </div>
  </section>

 
</div>
    </div>
  )
}


export default UserOtpLogin
