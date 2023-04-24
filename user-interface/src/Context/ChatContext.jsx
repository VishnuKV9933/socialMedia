import React,{useState,createContext} from 'react'

export const ChatContext=createContext(null)
function CurrentChatContext({children}) {

    const [currentChat,setCurrentChat]=useState(null)


  return (
    <ChatContext.Provider value={{currentChat,setCurrentChat}}>
        {children}
    </ChatContext.Provider>
  )
}

export default CurrentChatContext
