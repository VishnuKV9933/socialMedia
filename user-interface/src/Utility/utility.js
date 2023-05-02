export const defaultProfilePicUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"

// export const baseUrl="http://localhost:8800/api"
export const baseUrl="http://newworldnet.online/api"

export const fileSelector= function (setfile,setProfilePicturePreviewUrl){

    return (
        <label className="
bg-red-600 w-full h-full flex justify-center items-center
text-white bg-gradient-to-br from-purple-600 to-blue-500 
hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 
dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center 
        ">
        Select File
       <input 
       onChange={async(e) => {
         setfile(e.target.files);
        setProfilePicturePreviewUrl(URL.createObjectURL(e.target.files[0]))
       }}
       
       className="hidden"  name="image" type="file" />
       </label> 
    )


}


                