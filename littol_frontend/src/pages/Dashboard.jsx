import { useState, useContext } from "react";
import { useLogout } from "../hooks/useLogout";
import { UserContext } from "../context/AppContext";
import { sendEditProfileRequest } from '../services/authService';


function Dashboard() {
  const {handleLogout} = useLogout();
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
    <div className="p-14 flex flex-col items-center justify-center">
      <h2>Dashboard</h2>
      <div>Welcome {user?.fullname}!</div>
      <input className="p-2 mt-8 border rounded cursor-pointer" type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <button className="p-2 mt-8 bg-blue-500 rounded cursor-pointer" onClick={updateProfile}>Update Profile</button>
      <button className="p-2 mt-8 bg-violet-500 rounded cursor-pointer" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard