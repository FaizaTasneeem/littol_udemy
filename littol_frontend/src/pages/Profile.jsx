import { useState, useContext } from "react";
import { useFormHandler } from "../hooks/useForm";
import { UserContext } from "../context/AppContext";
import { sendEditProfileRequest } from '../services/profileService';


function Profile() {
  const {handleLogout} = useFormHandler({fullname:"", email:"", password:""});
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
        <img src="" alt="" className="w-50 h-50 border border-gray-300 rounded-full mr-10" />
        <h1 className="w-1/2 font-medium text-3xl">{user?.fullname}!</h1>

      </div>

      <input className="p-2 mt-8 border rounded cursor-pointer" type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <button className="p-2 mt-8 bg-blue-500 rounded cursor-pointer" onClick={updateProfile}>Update Profile</button>
      <button className="p-2 mt-8 bg-violet-500 rounded cursor-pointer" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile