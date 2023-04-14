import React,{useState,createContext, Children} from 'react'
import { defaultProfilePicUrl } from '../Utility/utility'

export const ProfileCardUrlContext=createContext(null)
function ProflePicContext(   {children}) {

    const [profilCardUrl,setProfileCardUrl]=useState(defaultProfilePicUrl)

  return (
    <ProfileCardUrlContext.Provider value={{profilCardUrl,setProfileCardUrl}}>
        {children}
    </ProfileCardUrlContext.Provider>
  )
}

export default ProflePicContext
