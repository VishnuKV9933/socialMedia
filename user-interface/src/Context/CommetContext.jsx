import React ,{useState,createContext} from 'react'

export const CommentContextSet=createContext(null)

function CommentContext({children}) {
    const [allComments, setAllComments] = useState([]);
  return (
  
    <CommentContextSet.Provider value={{allComments, setAllComments}}>
          {children}
    </CommentContextSet.Provider>
  )
}

export default CommentContext