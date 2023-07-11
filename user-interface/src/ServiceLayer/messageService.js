import { axiosInstance } from "../Utility/utility";


const messageService={

    
    getMessages:async(id)=>{
            try {
           const res =await axiosInstance.get(`/message/`+id)
           return res
        } catch (error) {
            console.log(error);
        }
       },
       sendMessage:async(message)=>{

        try {
            const res = await axiosInstance.post(`/message/`,message)
            return res
        } catch (error) {
            console.log(error);
        }
       }


}

export default messageService;