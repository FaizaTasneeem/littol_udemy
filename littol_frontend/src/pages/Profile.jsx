import { useState, useContext } from "react";
import { UserContext } from "../context/AppContext";
import { sendEditProfileRequest } from '../services/profileService';

const server = import.meta.env.VITE_BACKEND_SERVER || 'http://localhost:5000/';

function Profile() {
  const {accessToken, user, setUser, previewUrl, setPreviewUrl} = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [nameFocus, setNameFocus] = useState(false);


  async function updateProfile(update) {
    try {
        const payload = update instanceof FormData ? update : {...user, ...update};
        const response = await sendEditProfileRequest(payload, accessToken);
        setUser(response.data.updatedUser);
        setPreviewUrl(`${server}${response.data.updatedUser.profilePicFilePath}`);
        console.log("✅ User updated successfully !!!", response);
    }
    catch (err) {
        console.log("❌ User update failed. Please try again...", err);
    }
  };

  async function handleImageChange(e) {
    const imgFile = e.target.files?.[0];
    if (!imgFile) {
      console.log("No image selected");
      return;
    }
    // console.log(imgFile);
    const formData = new FormData();
    formData.append("image", imgFile);
    await updateProfile(formData);
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
          {!nameFocus && <h1 className="p-2 mt-8 w-1/2 font-medium text-3xl" onClick={handleNameChange}>{user?.fullname}!</h1>}
          {nameFocus && <input className="p-2 mt-8 w-1/2 rounded cursor-pointer" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onBlur={handleNameChange} autoFocus />}
          <h1 className="w-1/2 font-small text-xl">{user?.email}!</h1>
        </div>

      </div>

      <button className="p-2 mt-8 bg-blue-500 rounded cursor-pointer" onClick={() => {updateProfile({fullname:inputValue})}}>Update Profile</button>
    </div>
  )
}

export default Profile