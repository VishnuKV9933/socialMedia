import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import {  toast } from "react-toastify";

import SideBar from "../AdminComponents/SideBar";
import UserMangement from "../AdminComponents/UserMangement";

function AdminHomePage() {
  console.log("---------------------1---------------------");
  const navigate = useNavigate();
  const [openPost, setOpenPost] = useState(true);


  const [cookies, setCookies, removeCookie] = useCookies();


  useEffect(() => {
    const verifyToken = async () => {
      console.log("---------------------11---------------------");
      if (!cookies.adminjwt) {
        console.log("---------------------22---------------------");
        navigate("/adminlogin");
      } else {
        console.log("---------------------3---------------------");
        const { data } = await axios.post(
          "http://localhost:8800/api/auth/checkadmin",
          {},
          { withCredentials: true }
        );
        console.log(data);
        console.log(data.status);
        if (!data.status) {
          console.log("---------------------4---------------------");
          removeCookie("adminjwt");
          navigate("/adminlogin");
        } else {
          console.log("---------------------5---------------------");
          toast("Welcome");
        }
      }
    };
    verifyToken();
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("adminjwt");
    navigate("/adminlogin");
  };
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
