import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OtpInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";
import { auth } from "../firebaseConfig";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../Utility/utility";

function UserOtpLogin() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [user, setUser] = useState(null);
  const [reSend, setResend] = useState(true);
  const [reSendNumber, setResendNumber] = useState(null);
  const [timer, setTimer] = useState(0);
  const [errorControler, setErrorControler] = useState(false);

  const [invalid, setInvalid] = useState(false);

  const generateError = (err) => {
   
    toast.error(err, {
      position: "top-right",
    });
  };

  function callInvalidotptost() {
    generateError("Invalid OTP");
  }

  const resendCaller = () => {

    axios.get(`${baseUrl}/auth/otplogin/${phone.slice(3)}`).then((res) => {
      if (!res.data.user) {
        generateError("Mobile number not registered");
        return null;
      } else {
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        const formatPh = "+" + phone;
        signInWithPhoneNumber(auth, formatPh, appVerifier)
          .then((confimationResult) => {
            window.confimationResult = confimationResult;
            setLoading(false);

            toast.success("Otp sent successfully!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  function onCaptchVerify() {
    setErrorControler(true);
    if (!window.ecaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onsignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function startTimer() {

    let myInterval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(myInterval);
      setResend(true);
    }, 10000);
  }

  function onsignup() {
    setErrorControler(false);


    setLoading(true);


    if (!phone) {
      setLoading(false);
      generateError("Enter a vaid Mobile number");
      return null;
    }

    if (phone.trim() === "") {
      setLoading(false);
      generateError("field should not be empty");
      return null;
    } else if (phone.length !== 13) {
      setLoading(false);
      generateError("Invalid Mobile number");
      return null;
    } else {
      setResendNumber(phone?.slice(3));
      axios.get(`${baseUrl}/auth/otplogin/${phone.slice(3)}`).then((res) => {
        if (!res.data.user) {
          setLoading(false);
          generateError("Mobile number not registered");
          return null;
        } else {
          setLoading(true);
          onCaptchVerify();
          const appVerifier = window.recaptchaVerifier;

          const formatPh = "+" + phone;
          signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confimationResult) => {
              setErrorControler(true);
              window.confimationResult = confimationResult;
              setLoading(false);
              setShowOtp(true);
              startTimer();

              toast.success("Otp sent successfully!");
            })
            .catch((error) => {
              if (errorControler) {
                toast.success("Otp sent successfully!");
              } else {
                generateError("Authentication failed try again");
                setErrorControler(false);
              }
            });
          setLoading(false);
        }
      });
    }
  }

  function resendOtp() {
    setErrorControler(false);
    setLoading(true);

    if (!phone) {
      setLoading(false);
      generateError("Enter a valid Mobile number");
      return;
    }

    if (phone.trim() === "") {
      setLoading(false);
      generateError("Field should not be empty");
      return;
    } else if (phone.length !== 13) {
      window.confirmationResult = null;
      window.recaptchaVerifier = null;
      setLoading(false);
      generateError("Invalid Mobile number");
      return;
    } else {
      setResendNumber(phone?.slice(3));

      axios.get(`${baseUrl}/auth/otplogin/${phone.slice(3)}`).then((res) => {
        if (!res.data.user) {
          setLoading(false);
          generateError("Mobile number not registered");
          return;
        } else {
          setLoading(true);
          onCaptchVerify();
          const appVerifier = window.recaptchaVerifier;

          // Reset reCAPTCHA widget
       
          if (window.recaptchaWidgetId) {
            window.grecaptcha.reset(window.recaptchaWidgetId);
          }

          const formatPh = "+" + phone;
          signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
              setErrorControler(true);
              window.confirmationResult = confirmationResult;
              setLoading(false);
              setShowOtp(true);
              startTimer();

              toast.success("Otp sent successfully!");
            })
            .catch((error) => {
              console.log(error);
              if (errorControler) {
                toast.success("Otp sent successfully!");
              } else {
                generateError("Authentication failed. Try again.");
                setErrorControler(false);
              }
            });
          setLoading(false);
        }
      });
    }
  }

  const manageinvalidOtp = () => {
    setInvalid(true);

    setTimeout(() => {
      setInvalid(false);
    }, 2000);
  };

  function onOTPVerify() {
    manageinvalidOtp();

    setLoading(true);
    window.confimationResult
      .confirm(otp)
      .then(async (res) => {
      
        setUser(res.user);
        setLoading(false);
        axios.get(`${baseUrl}/auth/otpverify/${phone.slice(3)}`).then((res) => {
          const token = res.data.token;
          document.cookie = `jwt=${token}`;

          localStorage.setItem("userId", JSON.stringify(res.data.user._id));

          navigate("/userlogin");
        });
      })
      .catch((error) => {
    
        setLoading(false);
        callInvalidotptost();
      });
  }

  return (
    <div>
      <div id="recaptcha-container"></div>
      {user ? (
        <div>login success </div>
      ) : (
        <div className="bg-gradient-to-tr from-fuchsia-500 to-sky-300">
          <section
            id="login"
            className="p-4 flex flex-col  justify-center min-h-screen max-w-md mx-auto"
          >
            <div></div>

            {showOtp ? (
              <div className="bg-gradient-to-tr to-fuchsia-500 from-sky-300 w-full h-full  rounded-lg border-4	border-pink-600">
                <div
                  onClick={() => {
                    setShowOtp(false);
                    setOtp("");
                    setPhone("");
                    setLoading(false);
                    setShowOtp(false);
                    setUser(null);
                    setResend(true);
                    setResendNumber(null);
                  }}
                >
                  back
                </div>
                <div className="">
                  <div className="mt-16   flex flex-col  gap-6 justify-center  ">
                    {reSend && (
                      <button
                        className=""
                        onClick={(e) => {
                          e.stopPropagation();
                          resendOtp();
                        }}
                      >
                        Resend Otp
                      </button>
                    )}

                    {/* {reSend &&
                    <button  className="" onClick={()=>{resendCaller()}}>
                      Resend Otp
                    </button>
                }  */}

                    {/* {reSend ? (
                    <button  className="" onClick={()=>{onsignup()}}>
                      Resend Otp
                    </button>
                  ) :  
                  (
                    <div className="rounded-full bg-white"> {timer}</div>
                  )}  */}

                    <div className="flex-justify-center ml-10">
                      <OtpInput
                        OTPLength={6}
                        value={otp}
                        onChange={setOtp}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className=" test-red-300  ml-5"
                      ></OtpInput>
                    </div>
                  </div>
                  <div className="w-full flex justify-center mt-6">
                    <button
                      onClick={onOTPVerify}
                      style={{ backgroundColor: "white" }}
                      className="flex justify-center items-center gap-3 w-1/2 h-10 bg-white	font-bold	 text-red-500 rounded-md"
                    >
                      {loading && <CgSpinner className="animate-spin" />}
                      <span className="text-blue-500">Verify Otp</span>
                    </button>
                  </div>
                  {invalid && (
                    <span className="w-full flex justify-center mt-3 text-red-600 text-sm font-medium">
                      Invalid Otp
                    </span>
                  )}

                  <div className=" rounded w-28 ml-40 h-6 my-2 justify-center items-center mt-10 "></div>
                </div>
              </div>
            ) : (
              <div>
                <div className="p-6 bg-sky-50 rounded">
                  <div className="flex items-center justify-center font-black m-3 mb-12">
                    <h1 className="tracking-wide text-3xl text-gray-900">
                      NEW WORLD
                    </h1>
                  </div>

                  <div className="flex flex-col justify-center">
                    <label className="text-sm font-medium">Mobile Number</label>

                    <PhoneInput
                      className="mb-3 px-2 py-1.5  bg-gray-200
               mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
               focus:outline-none
               focus:border-sky-500
               focus:ring-1
               focus:ring-sky-500
               focus:invalid:border-red-500 focus:invalid:ring-red-500"
                      country={"in"}
                      value={phone}
                      onChange={setPhone}
                    />

                    <button
                      onClick={onsignup}
                      className="mt-6 mb-6 px-4 py-1.5 rounded-md shadow-lg bg-gradient-to-r from-pink-600 to-red-600 font-medium text-gray-100 block transition duration-300"
                    >
                      <span id="login_default_state">
                        Submit<span id="subtotal"></span>
                      </span>
                    </button>
                  </div>
                  <div className="mt-6 text-grey-dark">
                    <Link to={"/userlogin"}>
                      <span style={{ color: "blue" }}>Login in Page</span>
                    </Link>
                  </div>
                  <ToastContainer />
                  <div id="reqcapcha"></div>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default UserOtpLogin;
