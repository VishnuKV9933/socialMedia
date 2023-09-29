import React, { useEffect, useState } from 'react'
import { Navigate, Outlet ,useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { baseUrl } from './Utility/utility';
function Protect() {

const navigate=useNavigate()
const [cookies,removeCookie] = useCookies();


 const userId =  localStorage.getItem("userId")
useEffect(()=>{
  const getPostUser = async () => {
console.log("-----------------1---------------------");
    if(!userId || userId !== undefined){
      removeCookie("jwt");
    localStorage.removeItem("userId"); 
    navigate("/userLogin");
    console.log("-----------------2---------------------");
  }
  console.log(userId);
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

  return  <Outlet /> 
}

export default Protect
