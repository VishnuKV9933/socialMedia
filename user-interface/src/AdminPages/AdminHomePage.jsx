import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MdDashboard } from "react-icons/md";
import { CgMenuRound } from "react-icons/cg";

function AdminHomePage() {
  console.log("---------------------1---------------------");
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [cookies, setCookies, removeCookie] = useCookies();
  console.log(open);
  console.log("open");

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
    <div className="flex " >
      {/* <div>admin</div>
      <button onClick={logout}>logout</button> */}

      <div
        className={`bg-pink-400 ${
          open ? "w-72" : "w-20 "
        }  hidden md:block bg-gray-200 h-screen   xl:bock relative`}
        >
        <div className="py-4 px-6">
          <CgMenuRound
            className="w-8 h-8 absolute top-9 right-5 "
            onClick={() => setOpen(!open)}
          />

          {open && (
            <h1 className="text-xl absolute left-10 top-10 font-bold font-sans hover:font-serif">
              CINICONNECT
            </h1>
          )}
        </div>

        {open && (
          <div className="py-4 mt-10  px-6">
            <div
              className={`cursor-pointer h-12 mb-2 py-1 px-2 gap-2 flex items-center justify-center bg-none text-gray-700 hover:rounded-xl hover:bg-gray-100`}
            >
              <MdDashboard className="w-8 h-8" />
              <div>
                <div className="font-serif text-xl">DASHBOARD</div>
               
              </div>
            </div>
          </div>
        )}
      </div>
      

      {/* <ToastContainer/> */}
      <div>AdminHome</div>
    </div>
  );
}

export default AdminHomePage;
