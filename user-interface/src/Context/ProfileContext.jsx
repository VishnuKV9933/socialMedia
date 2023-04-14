import React ,{useState,createContext} from 'react'

export const ProfileDetailsContext=createContext(null)

function ProfileContext({children}) {
    const [profile,setProfile] = useState(null)
  return (
  
    <ProfileDetailsContext.Provider value={{profile,setProfile}}>
          {children}
    </ProfileDetailsContext.Provider>
  )
}

export default ProfileContext