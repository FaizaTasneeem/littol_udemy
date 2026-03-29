import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/AppContext";
import { sendEditProfileRequest } from '../services/profileService';


function Profile() {
  const {accessToken, user, setUser} = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [nameFocus, setNameFocus] = useState(false);

  useEffect(() => {
    // if (previewUrl)

  }, [previewUrl]);
 
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

  function handleImageChange(e) {
    if (e.target.files?.[0]) {
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleNameChange() {
    setNameFocus(!nameFocus);
  }
  
  return (
    <div className="w-full p-14 flex flex-col items-start justify-start">
      <div className="w-full flex flex-row items-start justify-start rounded-lg p-4 bg-gray-100">
        
        <label htmlFor="profile-pic" className="relative cursor-pointer">
          {!previewUrl && <div className="w-full absolute top-[40%] left-[20%] text-gray-500">Upload Image</div>}
          <img src={previewUrl} alt="" className="w-50 h-50 border-6 border-white rounded-full mr-10 " />
          <input type="file" id="profile-pic" onChange={handleImageChange} accept="image/*" hidden/>
        </label>

        <div className="w-full h-full ml-8 flex flex-col items-between justify-evenly">
          {!nameFocus && <h1 className="w-1/2 font-medium text-3xl" onClick={handleNameChange}>{user?.fullname}!</h1>}
          {nameFocus && <input className="p-2 mt-8 border rounded cursor-pointer" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onBlur={handleNameChange} autoFocus />}
          <h1 className="w-1/2 font-small text-xl">{user?.email}!</h1>
        </div>

      </div>

      <button className="p-2 mt-8 bg-blue-500 rounded cursor-pointer" onClick={updateProfile}>Update Profile</button>
    </div>
  )
}

export default Profile