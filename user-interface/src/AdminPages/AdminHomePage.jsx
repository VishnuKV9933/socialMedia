import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import {  toast } from "react-toastify";
import { baseUrl } from '../Utility/utility';

import SideBar from "../AdminComponents/SideBar";
import UserMangement from "../AdminComponents/UserMangement";

function AdminHomePage() {
  const navigate = useNavigate();


  const [cookies, removeCookie] = useCookies();


  useEffect(() => {
    const verifyToken = async () => {
      if (!cookies.adminjwt) {
        navigate("/adminlogin");
      } else {
        const { data } = await axios.post(
          `${baseUrl}/auth/checkadmin`,
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("adminjwt");
          navigate("/adminlogin");
        } else {
          toast("Welcome");
        }
      }
    };
    verifyToken();
  }, [cookies, navigate, removeCookie]);

 
  return (
    <div className="grid  grid-cols-20 bg-blue-50 h-screen" >

      <div className="col-span-4 h-full ">

      <SideBar/>
      </div>
      <div className="col-span-12 ">
      <div className="p-3 bg-blue-900 w-full bg-white rounded-lg text-white h- mt-1 flex 
      justify-center text-4xl font-bold font-serif">USER MANAGEMENT</div>
      <div className="mt-6">
      
        <UserMangement/>
      </div>

      </div>
    </div>
  );
}

export default AdminHomePage;
