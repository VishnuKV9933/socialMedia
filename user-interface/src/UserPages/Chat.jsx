import React, { useEffect, useRef, useState,useContext } from 'react'
import Conversations from '../Components/Conversations'
import Message from '../Components/Message'
import { useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client'
import {BiArrowBack} from 'react-icons/bi'
import ChatOnline from '../Components/ChatOnline';
import { ChatContext } from '../Context/ChatContext';
import { defaultProfilePicUrl } from '../Utility/utility';

import ConversationSeivice from '../ServiceLayer/conversationServiece.js';
import userService from '../ServiceLayer/userSevice';
import messageService from '../ServiceLayer/messageService';

function Chat() {


    const {currentChat,setCurrentChat} =useContext(ChatContext)
    const navigate=useNavigate()
    const userId = JSON.parse(localStorage.getItem("userId"));
    const scrollRef=useRef() 

    const [user,setUser]=useState(null)
    const [consversations,setConversations]=useState([])
    // const [currentChat,setCurrentChat]=useState(null)
    const [messages,setMessages]=useState([])
    const [onlineUsers,setOnlineUsers]=useState([])
    const [newMessage,setNewMessage]=useState('')
    const [arrivalMessage,setArrivalMessage]=useState('')
    const [onlineOpen,setOnlineOpen]=useState(false)
    const [newChat,setNewChat]=useState(false)
    const [currentChatFriend,setCurrentChatFriend]=useState('')
    const socket =useRef()
    const [count,setCount]=useState(0)

    useEffect(() => {

      if (!userId) {
        navigate("/");
      }
    }, []);


    useEffect(() => {

    if(!currentChat){

    }else{


const getConversation=async()=>{


            try {
                const res = ConversationSeivice.getTwoUserConverstions(currentChat.members[0],currentChat.members[1])
              
                if(!res.data){
                    setNewChat(true)
                }else{
                    
                    setCurrentChat(res.data)
                }
            } catch (error) {
              console.log(error);
            }

}


getConversation()

    }
      }, [newChat]);
  
  

    
    useEffect(()=>{

        socket.current=io('ws://localhost:8900')

        socket.current.on('getMessage',(data)=>{
            setArrivalMessage({
                senderId:data.senderId,
                text:data.text,
                createdAt: Date.now()
            })
        })

    },[])

    useEffect(()=>{

        arrivalMessage&&
        currentChat?.members.includes(arrivalMessage.senderId)&&
        setMessages((prev)=> [...prev,arrivalMessage])
    },[arrivalMessage,currentChat])

    useEffect(() => {

      const getUser = async () => {

        const res =await userService.getUser(userId)
        setUser(res.data)
      };
  
      getUser();
    }, [userId]);


    useEffect(()=>{

        const caller=async()=>{

            const res =await userService.getUser(userId)
              setUser(res.data)


            socket.current.emit("addUser",userId)
    
            socket.current.on('getUsers',users=>{
                
                setOnlineUsers(
                    res.data?.following?.filter((f)=>users?.some((u)=>u.userId===f))
                )
            })
        }
        caller()
       
    },[userId,currentChat,onlineOpen])
    

    

    useEffect(()=>{

        const getConversations=async ()=>{
            try {
                const res=await ConversationSeivice.getConversations(userId)
               setConversations(res)
            } catch (error) {
                console.log(error);
            }
        }

        getConversations()
    },[userId])
   
    useEffect(()=>{

        const getMessage=async ()=>{
            try {
                const res =await messageService.getMessages(currentChat?._id)
                setMessages(res?.data)
            } catch (error) {
               console.log(error);
            }
        }

        getMessage()
    },[currentChat])

    useEffect(()=>{
        scrollRef?.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    const getConversations=async ()=>{


        try {
            const res=await ConversationSeivice.getConversations(userId)
           setConversations(res)
        } catch (error) {
            console.log("",error);
        }
    }

    const userGet = async (elem) => {
        const friendId =elem?.members?.find((m)=>(m!==userId))
      
        const res = await userService.getUser(friendId)
        setCurrentChatFriend(res.data)
        }

    const handlSubmit=async(e)=>{
        e.preventDefault();

        
        if(newMessage.trim()!==''){
            if(!newChat){
            
    setCount(count+1)

                const message={
                    senderId:userId,
                    conversationId:currentChat._id,
                    text:newMessage
                }
    
                const receiverId =currentChat.members.find(
                    member=> member !==userId
                )
    
                socket.current.emit("sendMessage",{ 
                    senderId:userId,
                    receiverId,
                    text:newMessage
                })
    
                const res =await messageService.sendMessage(message)

               
                setMessages([...messages,res.data])
                setNewMessage('')
    
            }else{

        // new chat without converstaion registered
                    const [id,userId]=currentChat.members

            //    const res=  await axios.post(`${baseUrl}/conversation/`,{senderId:userId,receiverId:id})

            const res=await ConversationSeivice.getSingleConversation(userId,id)


               const message={
                senderId:userId,
                conversationId:res.data._id,
                text:newMessage
            }

            socket.current.emit("sendMessage",{ 
                senderId:userId,
                receiverId:id,
                text:newMessage
            })

            const ress =await messageService.sendMessage(message)
            setMessages([...messages,ress.data])
            setNewMessage('')
                setNewChat(false)
            }
            
        }

    }

  return (
    <div className='w-full h-screen  border  mt-1 border-blue-200 rounded overflow-y-scroll'>
      

{!currentChat?
        <>
    <div id="" className='mt-2 p-3'>
         
{onlineOpen?
<>
<div className='cursor-default mt-6 mb-6 text-xl font-bold text-cyan-700 transition ease-in-out delay-200  hover:-translate-y-1 hover:scale-100   duration-300 hover:font-extrabold' onClick={()=>{setOnlineOpen(false)}}>Go to My chats</div>
<div className=''>
    <ChatOnline onlineUsers={onlineUsers} currentId={userId} setCurrentChatFriend={setCurrentChatFriend} setCurrentChat={setCurrentChat} user={user} />
</div>
</>

:
        <>
          {/* ----------------------Conversations--------------------------- */}

        <div className='cursor-default mt-6 mb-6 text-xl font-bold text-cyan-700 transition ease-in-out delay-200  hover:-translate-y-1 hover:scale-100   duration-300  hover:font-extrabold ' onClick={()=>{setOnlineOpen(true)}}>Find online friends</div>
   {consversations?.map((elem)=>{
    return <>
    <div onClick={()=>{
       
         setCurrentChat(null)
        setCurrentChat(elem)
       
        

        
            userGet(elem)
        }}>

    <Conversations key={elem?._id} conversation={elem} currentUser={user}  setCurrentChatFriend={ setCurrentChatFriend }  />
    </div>
    </>
   })}
        </>
    }


    </div>
      {/* ----------------------Conversations--------------------------- */}

        </>

:

<>

<div id='chatBox' className='h-full rounded-md ' >
    <div className='w-full h-1/6   border-b-2 flex items-center gap-3 bg-gradient-to-r  from-blue-400 
       to-blue-700  font-bold text-cyan-800 '>
        <BiArrowBack  onClick={()=>{
            setNewChat(false)
            setCurrentChat(null)
            setCurrentChatFriend(null)
            getConversations()
            }} className='ml-3'/>
            <img className='w-12 h-12 rounded-full ' src={currentChatFriend?.profilePicture?currentChatFriend?.profilePicture:defaultProfilePicUrl} alt="img" />
            <div className='ml-3'>{currentChatFriend?.username}</div>
    </div>
<div id='chatBoxTop' className='flex flex-col overflow-y-scroll p-2 h-4/6 mt-2 '>
    {messages?.map((elem)=>{



        return <>
        <div ref={scrollRef}>

        <Message key={elem?._id} message={elem} own={elem.senderId ===userId}/>
        </div>
        </>
    })}

</div>

<div id='chatBoxBottom' className=' space-x-4 w-full p-5 border h-1/6  flex justify-center  bg-gradient-to-r  from-blue-400 
       to-blue-700  font-bold text-cyan-800'>
    <textarea
    onChange={(e)=>{setNewMessage(e.target.value)}}
    value={newMessage}
     id='chatMessageInput' className='w-w80  rounded border'>

    </textarea>
    <button
    onClick={handlSubmit}
     id='chatSubmitButton' className='bg-blue-400 hover:bg-blue-600 h-fit px-3 py-2 rounded mt-3 text-white font-bold'>Send</button>
</div>


</div>
</>




}
{/* ----------------------------------------Chat box--------------------------------------------- */}

    </div>
  )
}

export default Chat
