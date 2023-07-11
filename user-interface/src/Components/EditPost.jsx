/* eslint-disable no-restricted-globals */
import React, { useState,useRef, useEffect  } from "react";
import { FcPhotoReel } from "react-icons/fc";
import { HiOutlineTrash } from "react-icons/hi2";
import axios from "axios";
import { useCookies } from "react-cookie";
import { baseUrl } from "../Utility/utility";
function EditPost({postId ,setEditOpen,
  postCaller,
  setPost,
   setMore}) {

  // const posts = useSelector(state=> state.posts)
  const [description, setDescription] = useState("");
  const [file, setfile] = useState(null);
  const [hadImage,setHadImage] =useState(false)
  const textareaRef = useRef(null);
  const [cookies] = useCookies([]);
  // const { postId } = useParams();
const [initialFile,setInitialFile] =useState(null)
const [deleteImage,setDeleteImage]=useState(false)
  const userId = JSON.parse(localStorage.getItem("userId"));

let post=null





  function handleChange(event) {
    setDescription(event.target.value);
    // adjustTextareaHeight();
  } 

  

    useEffect(()=>{
        axios.get(`${baseUrl}/users/editpost/${postId}`).then((data)=>{
            post=data.data;
            setDescription(post.description)
            if(post?.image){
                setInitialFile(post.image)
                setfile(true);
                setHadImage(true)
            }
        })
    },[])

    const submit=(e)=>{
    
    e.preventDefault();

    const data = new FormData();
    const jwt = cookies.jwt;

    data.append("deleteImage",deleteImage)
    data.append('post',postId)
    
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
      .post(`${baseUrl}/users/postupdate`, data, {
        headers: { ContentType: "multipart/form-data", jwt: jwt },
      })
      .then((data) => {
     
          
          setDescription(null)
          setfile(null)
          postCaller()
      })
      .catch((e) => {
        console.log(e);
      });
      
      setEditOpen(false)
      setMore(false)   
      postCaller()  
    }
  return (
    
    < div className="bg-blue-100 h-full flex justify-center items-center">
      <form onSubmit={submit} className="flex gap-1 flex-col">
        {/* <div>
          <div className="md:hidden w-12 rounded-full overflow-hidden">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6tYl-IikcR09ow-_H9yFcUpQgV7aWYTobF5-qERbl2yJmM458f_EBJy0&s"
              alt="img"
            />
          </div>
        </div> */}
       


       <input
       
      ref={textareaRef}
      value={description}
      onChange={handleChange}
      className="resize-none border grow overflow-hidden mt-2 mx-2 h-10 rounded-lg px-4 py-2"
      placeholder="type something" />






{file && (
  <div className="flex  w-full">

    <div>
    <span 
     onClick={() => {
      setDeleteImage(true)
      setfile(null);
    }}
    className="flex text-sm w-full cursor-default text-blue-500 justify-center  font-semibold items-center">
    <HiOutlineTrash
      className="w-6 h-6 items-center ml-1">

    </HiOutlineTrash>Delete Image</span>
      { 
      
      initialFile?
     
      <img className="rounded" src={initialFile} alt="img" />:

    <img className="rounded" src={URL.createObjectURL(file[0])} alt="img" />
  }
    </div>
   
  
  </div>
)}



                <div id="photo&share" className="flex w-full gap-2 justify-center mt-4 mb-4">
                  
                  <label className="w-28 h-8 bg-blue-200
                      flex justify-center items-center
            text-white bg-gradient-to-br from-purple-600 to-blue-500 
            hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center">
                    <div id="photo">
                      <input
                        onChange={(e) => {
                          setfile(e.target.files);
                          console.log(e.target.files);
                          setInitialFile(null)
                        }}
                        className="hidden"
                        name="image"
                        type="File"
                      />
                      <FcPhotoReel className="w-8 h-8" />
                    </div>
                  </label>

                  
                    <button 
                    className="w-28 h-8 bg-blue-200
                      flex justify-center items-center
            text-white bg-gradient-to-br from-purple-600 to-blue-500 
            hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 
            dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center "
                    >Update</button>
                  {/* <button
                    type="submit"
                    id="share"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    share
                  </button> */}

                </div>
          
     
       </form>
    </div>
  );
}

export default EditPost;


