import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import Comment from "./Comment";
import "simplebar/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import { CommentContextSet } from "../Context/CommetContext";
import { baseUrl } from "../Utility/utility";
function CommendModal({
  isvisible,
  setOpen,
  commentIds,
  post,
  setLimit,
  limit,
  commentHandler,
  commentLength,
  setCommentLenght
}) {
  const MAX_HEIGHT = 100;
  const userId = JSON.parse(localStorage.getItem("userId"));

  const OVERLAY_STYLE={
    top:5,
    left:5,
    right:5,
    bottom:5,
    backgroundColor:'rgba(0,0,0,.2)',
    zIndex:1000
}

  const {allComments, setAllComments}=useContext(CommentContextSet);

  const [comment, setComment] = useState("");

  const [arrayLength, setArrayLength] = useState(null);

  // const [allComments, setAllComments] = useState([]);

  const myDivRef = useRef(null);

  const textareaRef = useRef(null);

  const handleClose = (e) => {
    if (e.target.id === "wraper") {
      setOpen(false);
      
      if (!isvisible) {
        setComment("");
      }
    }
    // e.stopPropogation();
  };

  const setMore = () => {
    setLimit(limit + 1);
  };

  const showLess = () => {
    setLimit(1);
  };


  useEffect(() => {
    const getComments = async () => {
      await axios
        .post(`${baseUrl}/users/getcomments`, {
          postId: commentIds.postId,
        })
        .then((data) => {
          setArrayLength(data.data.length);
          const array = data.data.slice(0, limit * 3);
          setAllComments(array);
        });
    };
    if (isvisible) {
      getComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isvisible, limit]);


  const commetnReducer =()=>{
    setCommentLenght(commentLength-1)
  }



  if (!isvisible) return null;

  function handleChange(event) {
    setComment(event.target.value);
    if (event.target.value.trim() === "") {
      textareaRef.current.style.height = "10px";
    }
    textareaRef.current.style.height = "auto";
    // adjustTextareaHeight();
    const height = textareaRef.current.scrollHeight;

    textareaRef.current.style.height = `${Math.min(height, MAX_HEIGHT)}px`;
  }

  const submit = (e) => {
    e.preventDefault();

    if (comment.trim() !== "") {
      axios
        .put(`${baseUrl}/users/addcomment`, {
          userId: commentIds.userId,
          postId: commentIds.postId,
          comment: comment,
        })
        .then((data) => {
          setAllComments([data.data, ...allComments]);
         
        });

        const Obj=post
        Obj.commenderId=userId
        Obj.comment=comment
        axios.post(`${baseUrl}/notification/commentpost`,Obj).then((data)=>{
        })

      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
      setComment("");
      commentHandler()

     


    }
  };

  return (
    <div
      ref={myDivRef}
      onClick={handleClose}
      id="wraper"
      style={OVERLAY_STYLE}
      className="fixed flex items-center justify-center rounded-lg p-2">

<div className="bg-white rounded-lg ">    
      <SimpleBar
        className="w-[350px] h-[500px] simplebar bg-white p-2 rounded-lg mt-2 mb-2 scroll-behavior"
        style={{ height: `${post.imageUrl ? 400 : 300}px` }}
 >
        {/* <div className="w-[350px] overflow-scroll scrollbar-hidden h-screen"> */}
        <div>
          
        </div>
       
        <div className="bg-white  rounded-t-md fixed w-[350px]">
          
        </div>
        {/* <hr/> */}
        {!post.imageUrl && <hr />}
        {post.imageUrl && (
          <div className="">
            <img src={post.imageUrl} alt="Post" className="w-full h-auto" />
          </div>
        )}
        {post.imageUrl ? (
          <div className="bg-white text-gray-600  ml-1">{post.description}</div>
        ) : (
          <div className="bg-white text-gray-600 ml-3 mt-4">
            {post.description}
          </div>
        )}
        <hr className="mt-2 ml-2 mr-2" />
        {/* <button className='text-blue-400 text-xl place-self-end' 
     
           >x</button> */}

        <div className="  bg-white p-2 rounded-b-md scroll-auto overflow-auto  mt-1">
          {/*  -------------------------------------content---------------------------------- */}

          <form onSubmit={submit} className="flex ml-3">
            <textarea
              ref={textareaRef}
              value={comment}
              style={{ maxHeight: `${MAX_HEIGHT}px` }}
              onChange={handleChange}
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
              onClick={showLess}
              className="mb-1 text-sm hover:text-blue-600 text-gray-400 cursor-pointer"
            >
              Show less...
            </div>
          )}
          {allComments.map((comment) => {
            return (
              <Comment            
                key={comment._id}
                comment={comment}
                postUserId={post.userId}
                postId={post._id}
                setArrayLength={setArrayLength}
                limit={limit}
                commetnReducer={commetnReducer}
                post={post}
              />
            );
          })}

          {/*  -------------------------------------content---------------------------------- */}
          <div className="w-full flex">
            {limit * 3 <= arrayLength - 1 && (
              <div
                onClick={setMore}
                className="hover:text-blue-600 text-gray-400 text-sm cursor-pointer"
              >
                Show more...
              </div>
            )}
          </div>
        </div>
      </SimpleBar>
      </div>
    </div>
  );
}

export default CommendModal;
// resize-none border ml-12 mr-12 w-[300px] overflow-hidden  rounded-md px-1 py-1
