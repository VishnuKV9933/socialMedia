import React, { useEffect, useState } from 'react'
import { Navigate, Outlet ,useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { baseUrl } from './Utility/utility';
function Protect() {

const navigate=useNavigate()
const [cookies,removeCookie] = useCookies();

// const [validate,setValidate]=useState(null)
const userId = JSON.parse(localStorage.getItem('userId'));
// setValidate(true)

useEffect(()=>{

  const verifyUser = async () => {
    console.log("-----1-----");

    if (!cookies.jwt) {

      navigate("/userLogin");
    } else {

      console.log("-----2-----");

      const { data } = await axios.post(
        `${baseUrl}/auth`,
        {},
        {
          withCredentials: true,
        }
      );
      if (!data.status) {
        console.log("-----3-----");

       
        removeCookie("jwt");
        localStorage.removeItem("userId"); 
        navigate("/userLogin");
      
      } else {
       
       
       
       navigate("/")
       
      }
      
    }
  };
  

  verifyUser();

},[])  
   


 
  return (userId)? <Outlet /> : <Navigate to="/userlogin" />
}

export default Protect
