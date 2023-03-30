import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
import "simplebar/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";

function CommendModal({
  isvisible,
  setOpen,
  commentIds,
  post,
  setLimit,
  limit,
  commentHandler
}) {
  const MAX_HEIGHT = 100;

  const [comment, setComment] = useState("");

  const [arrayLength, setArrayLength] = useState(null);

  const [allComments, setAllComments] = useState([]);

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
        .post(`http://localhost:8800/api/users/getcomments`, {
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
        .put("http://localhost:8800/api/users/addcomment", {
          userId: commentIds.userId,
          postId: commentIds.postId,
          comment: comment,
        })
        .then((data) => {
          setAllComments([data.data, ...allComments]);
          console.log("--------------jjjjjjjjjjjj----------");
         
        });
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
      className="fixed inset-0 bg-black bg-opacity-25  backdrop-blur-sm flex justify-center border-8 items-center"
    >
      <SimpleBar
        className="w-[350px] h-[500px] simplebar bg-white"
        style={{ height: `${post.imageUrl ? 400 : 300}px` }}
      >
        {/* <div className="w-[350px] overflow-scroll scrollbar-hidden h-screen"> */}
        <div className="bg-white  rounded-t-md fixed w-[350px]">
          <div className=" flex items-center">
            {/* ------------------profilepic-------------------------------- */}
            <div className="w-12 h-12 mr-4 overflow-hidden my-1 ml-1 mr-3  rounded-full">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* ------------------profilepic-------------------------------- */}
            <div>
              <div className="text-lg font-medium">John Doe</div>
              <div className="text-sm text-gray-500">2 hours ago</div>
            </div>
            <hr />
          </div>
        </div>
        {/* <hr/> */}
        {!post.imageUrl && <hr />}
        {post.imageUrl && (
          <div className="mt-12">
            <img src={post.imageUrl} alt="Post" className="w-full h-auto" />
          </div>
        )}
        <hr className="mt-2 ml-2 mr-2" />
        {post.imageUrl ? (
          <div className="bg-white text-gray-600  ml-1">{post.description}</div>
        ) : (
          <div className="bg-white text-gray-600 ml-3 mt-14">
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
            console.log(comment);
            return (
              <Comment            
                key={comment._id}
                comment={comment}
               
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
  );
}

export default CommendModal;
// resize-none border ml-12 mr-12 w-[300px] overflow-hidden  rounded-md px-1 py-1
