import { axiosInstance } from "../Utility/utility";

 const chatService={

    getTwoUserConverstions:async(member1,member2)=>{
        try {
            const res =await axiosInstance.get(`/conversation/${member1}/twouser/${member2}`)
            return res
        } catch (error) {
            console.log(error);
        }
    },
    getConversations:async(userId)=>{
        try {
            
            const res =await axiosInstance.get(`/conversation/`+userId)
            return res.data
        } catch (error) {
            console.log(error);
        }

    },
    getSingleConversation:async(userId,id)=>{
        try {
            const res=  await axiosInstance.post(`/conversation/`,{senderId:userId,receiverId:id})

            return res
            
        } catch (error) {
            console.log(error);
        }

    }


} 

export default chatService;