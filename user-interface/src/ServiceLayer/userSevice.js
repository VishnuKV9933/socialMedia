import { axiosInstance } from "../Utility/utility";

const userService = {
    getPosts: async (userId) => {
    try {
      const res = await axiosInstance.get(
        `/users/getposts/${userId}`
        // {cancelToken: source1.token}
      );

      return res?.data;
    } catch (error) {
      console.log(error);
    }
  },
  getUser: async (userId) => {
    try {
      const user = await axiosInstance.post(`/users/getuser`, {
        userId: userId,
      });

      return user;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userService;

// export const getPosts=async(userId)=>{
// const  res=  await  axiosInstance
//     .get(
//       `/users/getposts/${userId}`
//       // {cancelToken: source1.token}
//     )

//     return res?.data
// }
