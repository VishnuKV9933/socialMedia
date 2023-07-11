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
  const getPostUser = async () => {

    if(!userId){removeCookie("jwt");
    localStorage.removeItem("userId"); 
    navigate("/userLogin");
  }
   
    const res = await axios.post(`${baseUrl}/users/getuser`, {
      userId:userId
    });
  if(res.data?.block) {
    removeCookie("jwt");
    localStorage.removeItem("userId"); 
    navigate("/userLogin");}
  };

  getPostUser()
},[userId])

useEffect(()=>{

  const verifyUser = async () => {

    if (!cookies.jwt) {

      navigate("/userLogin");
    } else {


      const { data } = await axios.post(
        `${baseUrl}/auth`,
        {},
        {
          withCredentials: true,
        }
      );
      if (!data.status) {
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
   
  // return (userId)? <Outlet /> : <Navigate to="/userlogin" />
  return  <Outlet /> 
}

export default Protect
