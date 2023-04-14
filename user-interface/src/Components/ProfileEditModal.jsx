import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
import "simplebar/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";

function ProfilEditModal({
  isvisible,
  setOpen,
  post,
}) {

  const myDivRef = useRef(null);

  const textareaRef = useRef(null);

  const handleClose = (e) => {
    if (e.target.id === "wraper") {
      setOpen(false);
      
      if (!isvisible) {
      }
    }
    // e.stopPropogation();
  };

 

  

  

  if (!isvisible) return null;





  return (
    <div
      ref={myDivRef}
      onClick={handleClose}
      id="wraper"
      className="fixed inset-0 bg-black bg-opacity-25  backdrop-blur-sm flex justify-center border-8 items-center"
    >
      <SimpleBar
        className="w-[350px] h-[500px] simplebar bg-white"
       
      >
        {/* <div className="w-[350px] overflow-scroll scrollbar-hidden h-screen"> */}
        <div className="bg-white  rounded-t-md fixed w-[350px]">
          <div className=" flex items-center">
           



            
          </div>
        </div>
        {/* <hr/> */}
    

        <div className="  bg-white p-2 rounded-b-md scroll-auto overflow-auto  mt-1">
          {/*  -------------------------------------content---------------------------------- */}

          {/* <form className="flex ml-3">
            <textarea
              ref={textareaRef}
              style={{ maxHeight: `${MAX_HEIGHT}px` }}
            
              className="resize-none border mr-2 w-[300px] overflow-hidden  rounded-md px-2 py-1"
              placeholder="write a comment"
            />
            <button
              className="bg-gradient-to-r from-pink-200  to-blue-200 hover:from-blue-200 hover:to-pink-200
            w-w23 h-8 mr-3 mt-1 rounded"
              type="submit"
            >
              Add
            </button>
          </form>
          <hr className="mt-2 ml-2 mr-2" />
          {limit > 1 && (
            <div
              className="mb-1 text-sm hover:text-blue-600 text-gray-400 cursor-pointer"
            >
              Show less...
            </div>
          )}
    */}

          {/*  -------------------------------------content---------------------------------- */}
         
        </div>
      </SimpleBar>
    </div>
  );
}

export default ProfilEditModal;
// resize-none border ml-12 mr-12 w-[300px] overflow-hidden  rounded-md px-1 py-1
