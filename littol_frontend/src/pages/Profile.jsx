import { useState, useContext } from "react";
import { UserContext } from "../context/AppContext";
import { sendEditProfileRequest } from '../services/profileService';


function Profile() {
  const {accessToken, user, setUser} = useContext(UserContext);
  const [inputValue, setInputValue] = useState(""); 
 
  async function updateProfile() {
    try {
        const updatedUser = {...user, fullname:inputValue};
        const response = await sendEditProfileRequest(updatedUser, accessToken);
        setUser(updatedUser);
        console.log("✅ User updated successfully !!!", response);
    }
    catch (err) {
        console.log("❌ User update failed. Please try again...", err);
    }
  };
  
  return (
    <div className="w-full p-14 flex flex-col items-start justify-start">
      <div className="w-full flex flex-row items-start justify-start rounded-lg p-4 bg-gray-100">
        
        <input type="file" id="profile-pic" hidden/>
        <label htmlFor="profile-pic" className="relative cursor-pointer">
          <div className="w-full absolute top-[40%] left-[20%] text-gray-500">Upload Image</div>
          <img src="" alt="" className="w-50 h-50 border-6 border-white rounded-full mr-10 " />
        </label>

        <div className="w-full h-full ml-8 flex flex-col items-between justify-evenly">
          <h1 className="w-1/2 font-medium text-3xl">{user?.fullname}!</h1>
          <h1 className="w-1/2 font-small text-xl">{user?.email}!</h1>
        </div>

      </div>

      <input className="p-2 mt-8 border rounded cursor-pointer" type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <button className="p-2 mt-8 bg-blue-500 rounded cursor-pointer" onClick={updateProfile}>Update Profile</button>
    </div>
  )
}

export default Profile