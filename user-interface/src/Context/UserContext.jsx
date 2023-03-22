import React ,{useState,createContext} from 'react'

export const UserDetailsContext=createContext(null)

function UserContext({children}) {
    const [userId,setUserId] = useState(null)
  return (
  
    <UserDetailsContext.Provider value={{userId,setUserId}}>
          {children}
    </UserDetailsContext.Provider>
  )
}

export default UserContext



// import React,{useState,createContext} from 'react'

// export  const UsertokenContext=createContext(null)

// function UserContext({children}) {
//     const [token,setToken] = useState(null)

//   return (
//     <UsertokenContext.Provider  value={{token,setToken}}>
//       {children}
//     </UsertokenContext.Provider>
//   )
// }

// export default UserContext 

