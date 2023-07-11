import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../Utility/utility";

export default function UserSignup() {

  const navigate = useNavigate();

  const generateError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data) {
      try {
        const info = await axios.post(
          `${baseUrl}/auth/usersignup`,
          { ...data },
          {
            withCredentials: true,
          }
        );

        let datas = info.data;

        if (datas) {
          if (datas.errors) {
            const { email, password } = datas.errors;
            if (email) {
              generateError(email);
            } else if (password) {
              generateError(password);
            }
          } else {
            const token = datas.token;
            document.cookie = `jwt=${token}`;

            const verifyUser = async () => {
              if (!token) {
                console.log("notoken");
                navigate("/userLogin");
              } else {
                console.log("token",token);
                const { data } = await axios.post(
                  `${baseUrl}/auth`,
                  {},
                  {
                    headers: { authorization: "Bearer " + token },
                  }
                );

                // if (!data.status) {
                //   removeCookie("jwt");
                //   navigate("/userLogin");
                // } else {
                  localStorage.setItem("userId", JSON.stringify(data.user._id));

                  navigate("/");
                  console.log("/");
                // }
              }
            };

            verifyUser();
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const styles = {
    fontFamily: 'Georgia, serif',

      color: '#065666', // Replace with the actual hex code of bg-blue-800
    
  };
  return (
    <div className="App">
      <div class="bg-gradient-to-tr from-blue-200 to-sky-100">
        <section
          id="login"
          class="p-4 flex flex-col justify-center min-h-screen max-w-md mx-auto"
        >
          <div class="p-6 bg-sky-50 rounded">
            <div class="flex items-center justify-center font-black m-3 mb-12">
              <h1 style={styles} class="tracking-wide text-3xl text-gray-900">NEW WORLD</h1>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              class="flex flex-col justify-center"
            >
              <label class="text-sm font-medium text-sky-900">Name</label>
              <input
                class="mb-3 px-2 py-1.5
          mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none
          focus:border-sky-500
          focus:ring-1
          focus:ring-sky-500
          focus:invalid:border-red-500 focus:invalid:ring-red-500"
                type="text"
                name="name"
                placeholder="Enter name"
                {...register("name", {
                  required: "Name is required.",
                  minLength: {
                    value: 3,
                    message: "Name should be at-least 3 characters.",
                  },
                })}
              />
              {errors.name && (
                <p style={{ color: "red" }}>{errors.name.message}</p>
              )}

              <label class="text-sm font-medium text-sky-900">Email</label>
              <input
                class="mb-3 px-2 py-1.5
          mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none
          focus:border-sky-500
          focus:ring-1
          focus:ring-sky-500
          focus:invalid:border-red-500 focus:invalid:ring-red-500"
                type="text"
                name="email"
                placeholder="Enter  email"
                {...register("email", {
                  required: true,
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                })}
              />

              {errors.email && errors.email.type === "required" && (
                <p style={{ color: "red" }}>Email is required.</p>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <p style={{ color: "red" }}>Email is not valid.</p>
              )}

              <label class="text-sm font-medium text-sky-900">Mobile Number</label>
              <input
                class="mb-3 px-2 py-1.5
          mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none
          focus:border-sky-500
          focus:ring-1
          focus:ring-sky-500
          focus:invalid:border-red-500 focus:invalid:ring-red-500"
                type="text"
                name="mobile"
                placeholder="Enter  phone number"
                {...register("mobile", {
                  required: true,
                  pattern: /^([+]\d{2})?\d{10}$/,
                })}
              />
              {errors.mobile && errors.mobile.type === "required" && (
                <p style={{ color: "red" }}>Mobile number is required.</p>
              )}
              {errors.mobile && errors.mobile.type === "pattern" && (
                <p style={{ color: "red" }}>Mobile is not valid.</p>
              )}

              <label class="text-sm font-medium text-sky-900">Password</label>
              <input
                class="mb-3 px-2 py-1.5
          mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none
          focus:border-sky-500
          focus:ring-1
          focus:ring-sky-500
          focus:invalid:border-red-500 focus:invalid:ring-red-500"
                type="password"
                name="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password should be at-least  characters.",
                  },
                })}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password.message}</p>
              )}
              {/* <div class="block">
  
                <span class="ml-3">Select your field</span>
    
                    <div class="mt-2">
                    <label class="inline-flex items-center">
                        <input
                        type="checkbox"
                        name="hai"
                        class="w-6 h-3 rounded-full"
                        label="React"
                        value="Actor"
                        {...register("field", {
                        })}
                        />
                        <span class="ml-3">Producer</span>
                    </label>
                    </div> 


                <div class="mt-2">
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      class="w-6 h-3 rounded-full"
                      label="React"
                      value="Actor"
                      {...register("field")}
                    />
                    <span class="ml-3">Actor</span>
                  </label>
                </div>

                <div class="mt-2">
                  <label class="inline-flex items-center">
                    <input type="checkbox"
                     class="w-6 h-3 rounded-full" 
                     label="React"
                     value="Director"
                     {...register("field", {
                        required: "Please select at-least one field "
                    })}
                     />
                    <span class="ml-3">Director</span>
                  </label>
                </div>

              </div>
                 {errors.field && <p style={{color:"red"}}>{errors.field.message}</p>} */}
              <button
                class="mt-6 px-4 py-1.5 rounded-md shadow-lg bg-sky-700 font-medium text-gray-100 block transition duration-300"
                type="submit"
              >
                <span id="login_default_state">
                 Register<span id="subtotal"></span>
                </span>
              </button>
            </form>
            <ToastContainer />

            <div class="mt-6 text-grey-dark">
              Already have an account?
              <Link to={"/userLogin"}>
                <span style={{ color: "blue" }}>Login</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
