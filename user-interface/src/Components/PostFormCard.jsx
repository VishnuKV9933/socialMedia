/* eslint-disable no-restricted-globals */
import React, { useState,useRef, useEffect  } from "react";
import Card2 from "./Card2";
import { FcPhotoReel } from "react-icons/fc";
import { HiOutlineTrash } from "react-icons/hi2";
import axios from "axios";
import { useCookies } from "react-cookie";
import ShareButton from "./SharaButton";
import {io} from 'socket.io-client'
import { baseUrl } from "../Utility/utility";

// import { useDispatch, useSelector } from "react-redux";/redux
// import { setPosts } from "../redux/store";

function PostFormCard2({postAlert,
  posts,
  setPost
}) {
  // redux
  // const dispatch = useDispatch()
  // const posts = useSelector(state=> state.posts)
  const socket =useRef()

  const [description, setDescription] = useState("");
  const [file, setfile] = useState(null);
  const textareaRef = useRef(null);
  const [cookies] = useCookies([]);
 
  useEffect(()=>{
 
    const userId = JSON.parse(localStorage.getItem("userId"));

    socket.current=io('ws://localhost:8900')

    socket.current.emit("addUser",userId)

},[])

  function handleChange(event) {
    setDescription(event.target.value);
    adjustTextareaHeight();
  } 

  function adjustTextareaHeight() {
    if (textareaRef.current) {
       textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }}




  const selectFile=(e)=>{
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setfile(e.target.files)
    } else {
      alert('Please select an image file');
    }

      
  }

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
    }else if(description?.trim()!==""){
      data.append("description", description);
    }else{
      return
    }

    axios
      .post(`${baseUrl}/users/userpost`, data, {
        headers: { ContentType: "multipart/form-data", jwt: jwt },
      })
      .then((data) => {
        // redux
    //  dispatch(setPosts({
    //   posts : [data.data, ...posts]
    //  }))
    setPost([data.data, ...posts])
       setDescription(null)
       setfile(null)
       postAlert()
       textareaRef.current.value='';

        
// const senderId="6442b9959e441b08eac6cf75"
    
// const receiverId="6442ba049e441b08eac6cf95"

// const notice={senderId,receiverId}

// socket.current.emit("sendPost",notice)

   axios.post(`${baseUrl}/notification/post`,data.data).then((data)=>{
      })

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
          <label className="flex justify-center h-10 items-center rounded-xl w-1/2 hover:h-11  h:text-white  border-solid">
            <div id="photo">
              <input
                onChange= {selectFile }
                className="hidden"
                name="image"
                type="File"
                accept="image/*"
              />
              <FcPhotoReel className="w-8 h-8" />
            </div>
          </label>

<ShareButton/>
        

        </div>
      </form>
      {file && (
        <div className="flex  mt-2 w-full">
          <div>
          <img className="rounded" src={URL.createObjectURL(file[0])} alt="img" />
          </div>
         
          <HiOutlineTrash
            className="w-12 h-12 items-center"
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
