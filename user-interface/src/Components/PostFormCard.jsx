/* eslint-disable no-restricted-globals */
import React, { useState,useRef  } from "react";
import Card2 from "./Card2";
import { FcPhotoReel } from "react-icons/fc";
import { HiOutlineTrash } from "react-icons/hi2";
import axios from "axios";
import { useCookies } from "react-cookie";
import ShareButton from "./SharaButton";

function PostFormCard2({posts,setPost,postAlert}) {

  const [description, setDescription] = useState("");
  const [file, setfile] = useState(null);
  const textareaRef = useRef(null);
  const [cookies] = useCookies([]);
 

  function handleChange(event) {
    setDescription(event.target.value);
    adjustTextareaHeight();
  } 

  function adjustTextareaHeight() {
    if (textareaRef.current) {
       textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }}

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    const jwt = cookies.jwt;

    if(file){
    }
    if(file&&description){
      data.append("image", file[0]);
      data.append("description", description);
    }else if(file){
      data.append("image", file[0]);
    }else if(description){
      data.append("description", description);
    }else{
      return
    }

    axios
      .post("http://localhost:8800/api/users/userpost", data, {
        headers: { ContentType: "multipart/form-data", jwt: jwt },
      })
      .then((data) => {
     
       setPost([data.data, ...posts])
       console.log("posts");
       console.log(posts);
       setDescription(null)
       setfile(null)
       postAlert()
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    
    <Card2 >
      <form onSubmit={submit} className="flex gap-6 ">
        <div>
          <div className="md:hidden w-12 rounded-full overflow-hidden">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6tYl-IikcR09ow-_H9yFcUpQgV7aWYTobF5-qERbl2yJmM458f_EBJy0&s"
              alt="img"
            />
          </div>
        </div>
       


       <textarea
       
      ref={textareaRef}
      value={description}
      onChange={handleChange}
      className="resize-none border grow overflow-hidden h-10 rounded-lg px-4 py-2"
      placeholder="Type something..."  />


        <div id="photo&share" className="flex w-1/4 gap-2">
          
          <label className="flex justify-center h-10 items-center rounded-xl w-1/2 bg-indigo-200 hover:bg-indigo-500 border-solid">
            <div id="photo">
              <input
                onChange={(e) => {
                  setfile(e.target.files);
                  console.log(e.target.files);
                }}
                className="hidden"
                name="image"
                type="File"
              />
              <FcPhotoReel className="w-8 h-8" />
            </div>
          </label>

<ShareButton/>
          {/* <button
            type="submit"
            id="share"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            share
          </button> */}

        </div>
      </form>
      {file && (
        <div className="flex  mt-2 w-full">
          <div>
          <img className="rounded" src={URL.createObjectURL(file[0])} alt="img" />
          </div>
         
          <HiOutlineTrash
            className="w-72 h-72 items-center"
            onClick={() => {
              setfile(null);
            }}
          />
        </div>
      )}
    </Card2>
  );
}

export default PostFormCard2;
