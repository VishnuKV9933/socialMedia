import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { UserDetailsContext } from "../Context/UserContext";
function UserAuth({childern}) {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const { setUserId } = useContext(UserDetailsContext);
    useEffect(() => {
        const verifyUser = async () => {
          if (!cookies.jwt) {
            navigate("/userLogin");
          } else {
            const { data } = await axios.post(
              "http://localhost:8800/api/auth",
              {},
              {
                withCredentials: true,
              }
            );
            if (!data.status) {
              removeCookie("jwt");
              navigate("/userLogin");
            } else {
              setUserId(data.user._id);
              // toast(`HI ${data.user}`, { theam: "dark" });
            }
          }
        };
        verifyUser();
      }, [cookies, navigate, removeCookie]);
  return (
    <div>
      {childern}
    </div>
  )
}

export default UserAuth
