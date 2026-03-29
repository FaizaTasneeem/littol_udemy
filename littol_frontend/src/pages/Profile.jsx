import { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "../context/AppContext";
import { sendEditProfileRequest } from '../services/profileService';


function Profile() {
  const {accessToken, user, setUser} = useContext(UserContext);
  const [inputValue, setInputValue] = useState(user?.fullname || "");
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      console.log("Please select a valid image file.");
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }
 
  async function updateProfile() {
    try {
        const updatedUser = {...user, fullname: inputValue || user?.fullname};
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
        <img
          src={imagePreview || "https://placehold.co/200x200?text=Upload"}
          alt="Profile"
          className="w-50 h-50 border border-gray-300 rounded-full mr-10 cursor-pointer object-cover"
          onClick={handleImageClick}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <h1 className="w-1/2 font-medium text-3xl">{user?.fullname}!</h1>

      </div>

      <input className="p-2 mt-8 border rounded cursor-pointer" type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <button className="p-2 mt-8 bg-blue-500 rounded cursor-pointer" onClick={updateProfile}>Update Profile</button>
    </div>
  )
}

export default Profile