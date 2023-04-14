import React ,{useState,createContext} from 'react'

export const UserContext=createContext(null)

function User({children}) {
    const [profileCardName,setProfileCardName] = useState('')
  return (
  
    <UserContext.Provider value={{profileCardName,setProfileCardName}}>
          {children}
    </UserContext.Provider>
  )
}

export default User

